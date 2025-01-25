import validator from 'validator'
import stripeLib from 'stripe';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import db from '../db/initDatabase.js';
import jwt from 'jsonwebtoken'
const stripe = stripeLib(process.env.JWT_SECRET_STRIPE); 
const db = new sqlite3.Database('beauty_services.db');

//register user
const registerUser = (req, res) => {
  const { first_name, last_name, email, password, phone_number } = req.body;

  //Validate input
  if (!first_name || !last_name || !email || !password || !phone_number) {
    return res.json({ success: false, message: "Missing details" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Enter a valid email" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.json({ success: false, message: "Password must be at least 8 characters long" });
  }

  //Check if email already exists
  const checkEmailQuery = 'SELECT COUNT(*) AS emailCount FROM clients WHERE email = ?';

  db.get(checkEmailQuery, [email], async (err, row) => {
    if (err) {
      console.error('Error checking email existence:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    if (row.emailCount > 0) {
      return res.json({ success: false, message: 'Email already registered' });
    }

    try {
      //Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Insert new user into the database
      const insertUserQuery = `
        INSERT INTO clients (first_name, last_name, email, password, phone_number, points)
        VALUES (?, ?, ?, ?, ?, 0)
      `;

      db.run(
        insertUserQuery,
        [first_name, last_name, email, hashedPassword, phone_number],
        function (err) {
          if (err) {
            console.error('Error inserting user:', err.message);
            return res.json({ success: false, message: 'Failed to register user' });
          }

          // Generate a JWT token
          const token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, { expiresIn: '7d' });

          //Send success response
          res.json({ success: true, token });
        }
      );
    } catch (error) {
      console.error('Error during user registration:', error.message);
      res.json({ success: false, message: 'Internal server error' });
    }
  });
};

//login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  //Validate input
  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  //Check if user exists
  const getUserQuery = 'SELECT id, password FROM clients WHERE email = ?';

  db.get(getUserQuery, [email], async (err, user) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    try {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        //Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        //Send success response
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      res.json({ success: false, message: 'Internal server error' });
    }
  });
};


//get user profile data
const getProfile = (req, res) => {
    const { userId } =  req.query;
  
    //Validate input
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
  
    //Query to get user data without the password field
    const getUserQuery = `
      SELECT id, first_name, last_name, phone_number, email, points
      FROM clients
      WHERE id = ?
    `;
  
    db.get(getUserQuery, [userId], (err, userData) => {
      if (err) {
        console.error('Error fetching user data:', err.message);
        return res.json({ success: false, message: 'Database error' });
      }
  
      if (!userData) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      //Send user profile data
      res.json({ success: true, userData });
    });
  };
  
//update user profile data
const updateProfile = (req, res) => {
    const { userId, name, phone } = req.body;
    const imageFile = req.file;
  
    // Validate input
    if (!name || !phone) {
      return res.json({ success: false, message: 'Data missing' });
    }
  
    // Update user profile in the database
    const updateProfileQuery = `
      UPDATE clients
      SET first_name = ?, last_name = ?, phone_number = ?
      WHERE id = ?
    `;
  
    db.run(updateProfileQuery, [name.first_name, name.last_name, phone, userId], function (err) {
      if (err) {
        console.error('Error updating profile:', err.message);
        return res.json({ success: false, message: 'Database error' });
      }
  
      //Handle image upload if provided
      if (imageFile) {
        // Upload image
        const imageUpload = cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
  
        imageUpload.then((uploadResult) => {
          const imageURL = uploadResult.secure_url;
  
          // Update the profile image in the database
          const updateImageQuery = `
            UPDATE clients
            SET image_url = ?
            WHERE id = ?
          `;
  
          db.run(updateImageQuery, [imageURL, userId], (err) => {
            if (err) {
              console.error('Error updating image:', err.message);
              return res.json({ success: false, message: 'Error uploading image' });
            }
  
            // Return success response
            res.json({ success: true, message: 'Profile updated' });
          });
        }).catch((uploadErr) => {
          console.error('Error uploading image to cloud:', uploadErr.message);
          res.json({ success: false, message: 'Error uploading image' });
        });
      } else {
        // No image, return success response
        res.json({ success: true, message: 'Profile updated' });
      }
    });
  };
  

//book appointment
const bookAppointment = (req, res) => {
    const { userId, workId, slotDate, slotTime } = req.body;
    //Fetch worker data and check availability
    const workerQuery = `SELECT * FROM workers WHERE id = ?`;
    db.get(workerQuery, [workId], (err, workData) => {
      if (err) {
        console.error('Error fetching worker data:', err.message);
        return res.json({ success: false, message: 'Database error' });
      }
  
      if (!workData) {
        return res.json({ success: false, message: 'Worker not found' });
      }
  
      // Check worker availability
      const slotsQuery = `SELECT slots_booked FROM workers WHERE id = ?`;
      db.get(slotsQuery, [workId], (err, result) => {
        if (err) {
          console.error('Error fetching worker slots:', err.message);
          return res.json({ success: false, message: 'Database error' });
        }
  
        let slots_booked = JSON.parse(result.slots_booked || '{}');
        if (slots_booked[slotDate]) {
          if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: 'Slot not available' });
          } else {
            slots_booked[slotDate].push(slotTime);
          }
        } else {
          slots_booked[slotDate] = [slotTime];
        }
  
        //Fetch user data
        const userQuery = `SELECT * FROM clients WHERE id = ?`;
        db.get(userQuery, [userId], (err, userData) => {
          if (err) {
            console.error('Error fetching user data:', err.message);
            return res.json({ success: false, message: 'Database error' });
          }
  
          if (!userData) {
            return res.json({ success: false, message: 'User not found' });
          }
  
          //Book the appointment
          const appointmentQuery = `
            INSERT INTO bookings (client_id, worker_id, date, time_slot)
            VALUES (?, ?, ?, ?)
          `;
          const bookingDate = new Date().toISOString();
  
          db.run(appointmentQuery, [userId, workId, bookingDate, slotTime], function (err) {
            if (err) {
              console.error('Error booking appointment:', err.message);
              return res.json({ success: false, message: 'Error booking appointment' });
            }
  
            //Update worker's booked slots
            const updateSlotsQuery = `UPDATE workers SET slots_booked = ? WHERE id = ?`;
            const updatedSlots = JSON.stringify(slots_booked);
            db.run(updateSlotsQuery, [updatedSlots, workId], (err) => {
              if (err) {
                console.error('Error updating worker slots:', err.message);
                return res.json({ success: false, message: 'Error updating slots' });
              }
  
              // Return success response
              res.json({ success: true, message: 'Appointment booked' });
            });
          });
        });
      });
    });
  };
  
//get user appointment / frontend my-appointments page
const listAppointment = (req, res) => {
    const { userId } = req.body;
  
    //Query to fetch appointments for the user
    const appointmentsQuery = `
      SELECT 
        b.id AS appointment_id, 
        b.date AS appointment_date, 
        b.time_slot AS appointment_time, 
        s.name AS service_name, 
        w.name AS worker_name, 
        b.location AS location, 
        b.payment_status AS payment_status 
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN workers w ON b.worker_id = w.id
      WHERE b.client_id = ?
      ORDER BY b.date DESC, b.time_slot DESC
    `;
  
    db.all(appointmentsQuery, [userId], (err, appointments) => {
      if (err) {
        console.error('Error fetching appointments:', err.message);
        return res.json({ success: false, message: 'Database error' });
      }
  
      if (appointments.length === 0) {
        return res.json({ success: false, message: 'No appointments found' });
      }
  
      //Return the appointments data
      res.json({ success: true, appointments });
    });
  };
 
//cancel appointment
const cancelAppointment = (req, res) => {
    const { userId, appointmentId } = req.body;
  
    //Query to get the appointment details
    const appointmentQuery = `
      SELECT b.client_id, b.worker_id, b.date, b.time_slot, b.service_id 
      FROM bookings b
      WHERE b.id = ?
    `;
  
    db.get(appointmentQuery, [appointmentId], (err, appointmentData) => {
      if (err) {
        console.error('Error fetching appointment:', err.message);
        return res.json({ success: false, message: 'Database error' });
      }
  
      //Verify the appointment user
      if (appointmentData && appointmentData.client_id !== userId) {
        return res.json({ success: false, message: 'Unauthorized action' });
      }
  
      if (!appointmentData) {
        return res.json({ success: false, message: 'Appointment not found' });
      }
  
      //Mark the appointment as cancelled
      const cancelQuery = `
        UPDATE bookings
        SET payment_status = 'Cancelled'
        WHERE id = ?
      `;
  
      db.run(cancelQuery, [appointmentId], (err) => {
        if (err) {
          console.error('Error cancelling appointment:', err.message);
          return res.json({ success: false, message: 'Error updating appointment status' });
        }
  
        //Release the worker's time slot
        const { worker_id, date, time_slot } = appointmentData;
  
        const releaseSlotQuery = `
          DELETE FROM worker_availability
          WHERE worker_id = ? AND date = ? AND time_slot = ?
        `;
  
        db.run(releaseSlotQuery, [worker_id, date, time_slot], (err) => {
          if (err) {
            console.error('Error releasing worker slot:', err.message);
            return res.json({ success: false, message: 'Error releasing worker slot' });
          }
  
          //Return success response
          res.json({ success: true, message: 'Appointment cancelled successfully' });
        });
      });
    });
  };

// Function to process payment and update client points
async function processPayment(clientId, bookingId, amount, paymentMethod) {
  try {
    // Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount is in cents
      currency: 'daz', 
      payment_method: paymentMethod, // Client's payment method ID 
      confirm: true, // Automatically confirm the payment
    });

    //Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      // Payment was successful, proceed with updating the database

      //  Update the payment status in the Payments table
      db.run(
        `INSERT INTO payments (booking_id, amount, payment_method, payment_status, payment_date) VALUES (?, ?, ?, ?, ?)`,
        [bookingId, amount, paymentMethod, 'succeeded', new Date().toISOString()],
        function (err) {
          if (err) {
            console.error('Error inserting payment:', err.message);
          } else {
            console.log('Payment successfully recorded.');
          }
        }
      );

      // Increase the client's points by 1
      db.run(
        `UPDATE clients SET points = points + 1 WHERE id = ?`,
        [clientId],
        function (err) {
          if (err) {
            console.error('Error updating client points:', err.message);
          } else {
            console.log('Client points updated successfully.');
          }
        }
      );

      //create an entry in the service history
      db.run(
        `INSERT INTO service_history (client_id, worker_id, service_id, booking_date, payment_status, location) 
        SELECT client_id, worker_id, service_id, date, 'succeeded', location 
        FROM bookings WHERE id = ?`,
        [bookingId],
        function (err) {
          if (err) {
            console.error('Error creating service history entry:', err.message);
          } else {
            console.log('Service history entry created successfully.');
          }
        }
      );

      return { success: true, paymentIntent };
    } else {
      return { success: false, message: 'Payment failed' };
    }
  } catch (error) {
    console.error('Error processing payment:', error.message);
    return { success: false, message: error.message };
  }
}
});

  

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,processPayment};

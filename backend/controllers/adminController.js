import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import db from '../db/initDatabase.js';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';


//add worker
const addWorker = async (req, res) => {
    try {
       

        const { name, email, password, category_id, bio} = req.body; 
        const imageFile = req.file;
       

        let services = [];
        for (let i = 0; req.body[`services[${i}].id`]; i++) {
            const serviceId = req.body[`services[${i}].id`];
            const servicePrice = req.body[`services[${i}].price`];
            services.push({ service_id: serviceId, price: servicePrice });
        }
        // Validate required fields
        if (!name || !email || !password || !category_id || !services || services.length === 0) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email address" });
        }

        // Validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short (minimum 8 characters)" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let imageUrl = null;
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        // Insert worker into the database
        const workerInsertQuery = `
            INSERT INTO workers (name, category_id, bio, email, password, image_url) 
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        
        // Wrap db.run inside a Promise to use await
        const workerId = await new Promise((resolve, reject) => {
            db.run(workerInsertQuery, [name, category_id, bio, email, hashedPassword, imageUrl], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.lastID); // Return the workerId from the inserted row
            });
        });

        // Insert worker-service relationships
        const serviceInsertQuery = `
            INSERT INTO worker_services (worker_id, service_id, price) 
            VALUES (?, ?, ?);
        `;
        
        // Wrap each db.run call inside a Promise to handle async behavior
        const servicePromises = services.map(service => {
            return new Promise((resolve, reject) => {
                db.run(serviceInsertQuery, [workerId, service.service_id, service.price], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });

        // Wait for all worker-service inserts to complete
        await Promise.all(servicePromises);

        res.json({ success: true, message: "Worker and services added successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};



// Login Admin 
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query to check if the admin's credentials are correct (based on email only)
    db.get('SELECT id, email, password FROM workers WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Database error' });
      }

      if (!row) {
        return res.json({ success: false, message: 'Invalid credentials' });
      }

      // Compare the password with the hashed password in the database
      bcrypt.compare(password, row.password, (err, isMatch) => {
        if (err) {
          return res.json({ success: false, message: 'Error comparing password' });
        }

        if (isMatch) {
          // If passwords match, generate a JWT token with user details (id and email)
          const token = jwt.sign({ id: row.id, email: row.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
          return res.json({ success: true, token });
        } else {
          return res.json({ success: false, message: 'Invalid credentials' });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


  //get all workers for admin panel
  const allWorkers = async (req, res) => {
    try {
      // Query the SQLite database to get all workers, excluding the password column
      db.all('SELECT id, name, category_id, bio, email, image_url FROM workers', [], (err, rows) => {
        if (err) {
          console.error('Error fetching workers:', err.message);
          return res.json({ success: false, message: 'Database error' });
        }
  
        // Return the list of workers
        res.json({ success: true, workers: rows });
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

//get all appointment list
const appointmentsAdmin = (req, res) => {
    try {
      // Query to get all appointments
      const query = `
        SELECT 
          b.id AS booking_id,
          b.client_id,
          c.first_name || ' ' || c.last_name AS client_name,
          b.worker_id,
          w.name AS worker_name,
          b.service_id,
          s.name AS service_name,
          b.date,
          b.time_slot,
          b.location,
          b.payment_status
        FROM bookings AS b
        INNER JOIN clients AS c ON b.client_id = c.id
        INNER JOIN workers AS w ON b.worker_id = w.id
        INNER JOIN services AS s ON b.service_id = s.id
        ORDER BY b.date DESC, b.time_slot ASC
      `;
  
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error fetching appointments:', err.message);
          return res.json({ success: false, message: 'Database error' });
        }
  
        // Respond with the retrieved appointments
        res.json({ success: true, appointments: rows });
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
 //appointment cancellation
 const appointmentCancel = (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      //Fetch the appointment details
      const getAppointmentQuery = `
        SELECT worker_id, date AS slotDate, time_slot AS slotTime
        FROM bookings
        WHERE id = ? AND cancelled IS NULL
      `;
  
      db.get(getAppointmentQuery, [appointmentId], (err, appointmentData) => {
        if (err) {
          console.error('Error fetching appointment:', err.message);
          return res.json({ success: false, message: 'Error fetching appointment details' });
        }
  
        if (!appointmentData) {
          return res.json({ success: false, message: 'Appointment not found or already cancelled' });
        }
  
        const { worker_id: workerId, slotDate, slotTime } = appointmentData;
  
        // Mark the appointment as cancelled
        const cancelAppointmentQuery = `
          UPDATE bookings
          SET cancelled = 1
          WHERE id = ?
        `;
  
        db.run(cancelAppointmentQuery, [appointmentId], (err) => {
          if (err) {
            console.error('Error cancelling appointment:', err.message);
            return res.json({ success: false, message: 'Error cancelling appointment' });
          }
  
          //Update worker availability to release the slot
          const releaseSlotQuery = `
            INSERT OR IGNORE INTO worker_availability (worker_id, date, time_slot, duration)
            VALUES (?, ?, ?, 1)
          `;
  
          db.run(releaseSlotQuery, [workerId, slotDate, slotTime], (err) => {
            if (err) {
              console.error('Error releasing worker slot:', err.message);
              return res.json({ success: false, message: 'Error releasing worker slot' });
            }
  
            // Success response
            res.json({ success: true, message: 'Appointment cancelled successfully and slot released' });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'An unexpected error occurred' });
    }
  };
  

//get dashboard data for admin panel
const adminDashboard = (req, res) => {
    try {
      //Fetch the total count of workers, clients, and appointments
      const workersQuery = 'SELECT COUNT(*) AS workerCount FROM workers';
      const clientsQuery = 'SELECT COUNT(*) AS clientCount FROM clients';
      const appointmentsQuery = 'SELECT COUNT(*) AS appointmentCount FROM bookings';
      const latestAppointmentsQuery = `
        SELECT b.id, b.date, b.time_slot, c.first_name || ' ' || c.last_name AS client_name, 
               w.name AS worker_name, s.name AS service_name
        FROM bookings b
        JOIN clients c ON b.client_id = c.id
        JOIN workers w ON b.worker_id = w.id
        JOIN services s ON b.service_id = s.id
        ORDER BY b.date DESC, b.time_slot DESC
        LIMIT 5
      `;
  
      // Execute queries in parallel
      db.serialize(() => {
        const dashboardData = {};
  
        // Fetch worker count
        db.get(workersQuery, [], (err, row) => {
          if (err) {
            console.error('Error fetching worker count:', err.message);
            return res.json({ success: false, message: 'Error fetching worker data' });
          }
          dashboardData.workers = row.workerCount;
  
          // Fetch client count
          db.get(clientsQuery, [], (err, row) => {
            if (err) {
              console.error('Error fetching client count:', err.message);
              return res.json({ success: false, message: 'Error fetching client data' });
            }
            dashboardData.clients = row.clientCount;
  
            // Fetch appointment count
            db.get(appointmentsQuery, [], (err, row) => {
              if (err) {
                console.error('Error fetching appointment count:', err.message);
                return res.json({ success: false, message: 'Error fetching appointment data' });
              }
              dashboardData.appointments = row.appointmentCount;
  
              // Fetch latest appointments
              db.all(latestAppointmentsQuery, [], (err, rows) => {
                if (err) {
                  console.error('Error fetching latest appointments:', err.message);
                  return res.json({ success: false, message: 'Error fetching latest appointment data' });
                }
                dashboardData.latestAppointments = rows;
  
                // Send final response
                res.json({ success: true, dashData: dashboardData });
              });
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'An unexpected error occurred' });
    }
  };
  

export {addWorker,loginAdmin,allWorkers,appointmentsAdmin,appointmentCancel,adminDashboard};

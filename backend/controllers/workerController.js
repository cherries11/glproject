import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import db from '../db/initDatabase.js';
import jwt from 'jsonwebtoken'

const changeAvailability = (req, res) => {
  const { workId } = req.body;

  //Query to fetch the current availability of the worker
  const checkAvailabilityQuery = `
    SELECT available 
    FROM workers 
    WHERE id = ?
  `;

  db.get(checkAvailabilityQuery, [workId], (err, workerData) => {
    if (err) {
      console.error('Error fetching worker data:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Check if worker exists
    if (!workerData) {
      return res.json({ success: false, message: 'Worker not found' });
    }

    //Toggle the availability
    const newAvailability = workerData.available === 1 ? 0 : 1;

    //Update the worker's availability status
    const updateAvailabilityQuery = `
      UPDATE workers
      SET available = ?
      WHERE id = ?
    `;

    db.run(updateAvailabilityQuery, [newAvailability, workId], (err) => {
      if (err) {
        console.error('Error updating worker availability:', err.message);
        return res.json({ success: false, message: 'Error updating availability' });
      }

      // Return success response
      res.json({ success: true, message: 'Availability changed successfully' });
    });
  });
};

const workerList = (req, res) => {
  //SQL query to get workers excluding password and email
  const query = `
    SELECT id, name, category_id, bio, image_url 
    FROM workers
  `;

  db.all(query, [], (err, workers) => {
    if (err) {
      console.error('Error fetching workers:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    // Return workers in the response
    res.json({ success: true, workers });
  });
};

//worker login
const loginWorker = (req, res) => {
  const { email, password } = req.body;

  //Query the database to find the worker by email
  const query = 'SELECT * FROM workers WHERE email = ?';

  db.get(query, [email], async (err, worker) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    if (!worker) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    try {
      const isMatch = await bcrypt.compare(password, worker.password);
      if (isMatch) {
        //Generate JWT token if passwords match
        const token = jwt.sign({ id: worker.id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error.message);
      res.json({ success: false, message: 'Error comparing passwords' });
    }
  });
};

//get worker appointments for worker panel
const appointmentsWorker = (req, res) => {
  const { workId } = req.query.workId;

  //Query the database to get appointments for the worker
  const query = `
    SELECT bookings.id, bookings.date, bookings.time_slot, bookings.location, bookings.payment_status,
           clients.first_name, clients.last_name, services.name AS service_name
    FROM bookings
    JOIN clients ON bookings.client_id = clients.id
    JOIN services ON bookings.service_id = services.id
    WHERE bookings.worker_id = ?`;

  db.all(query, [workId], (err, appointments) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Send appointments in response
    res.json({ success: true, appointments });
  });
};

//to mark appointments completed for worker panel
const appointmentComplete = (req, res) => {
  const { workId, appointmentId } = req.body;

  //Query the database to check if the appointment exists and belongs to the correct worker
  const query = `
    SELECT * FROM bookings
    WHERE id = ? AND worker_id = ?`;

  db.get(query, [appointmentId, workId], (err, appointmentData) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Check if the appointment exists and if the worker ID matches
    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found or you are not the assigned worker' });
    }

    // Mark the appointment as completed by updating the `payment_status` or adding `isCompleted` field
    const updateQuery = `
      UPDATE bookings
      SET payment_status = 'Completed'  -- You can add or update other fields as needed, e.g., "isCompleted = 1"
      WHERE id = ?`;

    db.run(updateQuery, [appointmentId], (err) => {
      if (err) {
        console.error('Error updating appointment status:', err.message);
        return res.json({ success: false, message: 'Failed to update appointment status' });
      }

      //Send success response
      return res.json({ success: true, message: 'Appointment marked as completed' });
    });
  });
};

//cancel appointments for worker panel
const appointmentCancel = (req, res) => {
  const { workId, appointmentId } = req.body;

  //Query the database to check if the appointment exists and belongs to the correct worker
  const query = `
    SELECT * FROM bookings
    WHERE id = ? AND worker_id = ?`;

  db.get(query, [appointmentId, workId], (err, appointmentData) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Check if the appointment exists and if the worker ID matches
    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found or you are not the assigned worker' });
    }

    //Mark the appointment as cancelled
    const updateQuery = `
      UPDATE bookings
      SET payment_status = 'Cancelled'  -- You can add or update other fields as needed, e.g., "isCancelled = 1"
      WHERE id = ?`;

    db.run(updateQuery, [appointmentId], (err) => {
      if (err) {
        console.error('Error updating appointment status:', err.message);
        return res.json({ success: false, message: 'Failed to cancel appointment' });
      }

      //Send success response
      return res.json({ success: true, message: 'Appointment cancelled' });
    });
  });
};

//get dashboard data for worker panel
const workerdashboard = (req, res) => {
  const { workId } = req.body;

  //Fetch all appointments for the worker
  const query = `
    SELECT b.id, b.client_id, b.worker_id, b.date, b.time_slot, b.location, b.payment_status, p.amount
    FROM bookings b
    LEFT JOIN payments p ON b.id = p.booking_id
    WHERE b.worker_id = ?`;

  db.all(query, [workId], (err, appointments) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Calculate earnings, unique clients, and latest appointments
    let earnings = 0;
    let clients = [];
    const latestAppointments = [];

    appointments.forEach((item) => {
      // Calculate earnings
      if (item.payment_status === 'Completed' || item.payment_status === 'Paid') {
        earnings += item.amount || 0;
      }

      // Track unique clients
      if (!clients.includes(item.client_id)) {
        clients.push(item.client_id);
      }

      // Track latest appointments
      latestAppointments.push(item);
    });

    // Get the 5 latest appointments (reverse and slice)
    latestAppointments.reverse();
    const latestAppointmentsData = latestAppointments.slice(0, 5);

    //Structure the dashboard data
    const dashData = {
      earnings,
      appointments: appointments.length,
      clients: clients.length,
      latestAppointments: latestAppointmentsData,
    };

    //Return the data
    res.json({ success: true, dashData });
  });
};

//get worker profile for worker panel
const workerprofile = (req, res) => {
  const { workId } = req.body;

  // Query to fetch worker's profile excluding the password
  const query = `
    SELECT id, name, category_id, bio, email, image_url
    FROM workers
    WHERE id = ?`;

  db.get(query, [workId], (err, profileData) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Check if profile data is found
    if (!profileData) {
      return res.json({ success: false, message: 'Worker not found' });
    }

    //Return the worker profile data
    res.json({ success: true, profileData });
  });
};

//update profile data for worker panel
const updateWorkerprofile = (req, res) => {
  const { workId, fees, address, available } = req.body;

  // Prepare SQL query to update worker's profile data
  const query = `
    UPDATE workers
    SET bio = ?, image_url = ?, address = ?, fees = ?
    WHERE id = ?`;

  db.run(query, [address, fees, available, workId], function(err) {
    if (err) {
      console.error('Error updating profile:', err.message);
      return res.json({ success: false, message: 'Database error' });
    }

    //Check if any rows were updated
    if (this.changes === 0) {
      return res.json({ success: false, message: 'Worker not found' });
    }

    // Return success response if the update was successful
    res.json({ success: true, message: 'Profile updated successfully' });
  });
};



export{changeAvailability,workerList,loginWorker,appointmentsWorker,appointmentComplete,appointmentCancel,workerdashboard,workerprofile,updateWorkerprofile};



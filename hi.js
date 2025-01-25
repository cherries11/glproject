
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('beauty_services.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables 
db.serialize(() => {
  // Create Categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`);

 // Create Clients table 
 db.run(`CREATE TABLE IF NOT EXISTS clients ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    phone_number TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    points INTEGER DEFAULT 0 )`);

  // Create Workers table
  db.run(`CREATE TABLE IF NOT EXISTS workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    bio TEXT,
    price REAL NOT NULL, 
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  // Create Services table
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  // Create Bookings table
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    worker_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    location TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
  )`);
  //Create History table
  db.run(`CREATE TABLE IF NOT EXISTS service_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
  worker_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  booking_date TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  location TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (worker_id) REFERENCES workers(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
  )`);


  // Create Payments table
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    payment_date TEXT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
  )`);

  // Create Portfolios table
  db.run(`CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (worker_id) REFERENCES workers(id)
  )`);

  // Create WorkerAvailability table
  db.run(`CREATE TABLE IF NOT EXISTS worker_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    UNIQUE (worker_id, date, time_slot)  
  )`);

  // Create PointsProgram table
  db.run(`CREATE TABLE IF NOT EXISTS points_program (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )`);
});

db.close((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
  

module.exports = db;




















// Fonction pour créer les tables
function initializeTables() {
  // Table Categories
  db.query(
    `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `,
    (err) => {
      if (err) console.error("Error creating categories table:", err.message);
      else console.log("Categories table created.");
    }
  );

  // Table Clients
  db.query(
    `
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        points INT DEFAULT 0
      );
    `,
    (err) => {
      if (err) console.error("Error creating clients table:", err.message);
      else console.log("Clients table created.");
    }
  );

  // Table Workers
  db.query(
    `
      CREATE TABLE IF NOT EXISTS workers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        bio TEXT,
        price REAL NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err) console.error("Error creating workers table:", err.message);
      else console.log("Workers table created.");
    }
  );

  // Table Services
  db.query(
    `
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err) console.error("Error creating services table:", err.message);
      else console.log("Services table created.");
    }
  );

  // Table Bookings
  db.query(
    `
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        worker_id INTEGER NOT NULL,
        service_id INTEGER NOT NULL,
        date TEXT NOT NULL,
       time_slot TEXT NOT NULL,
       location TEXT NOT NULL,
       payment_status TEXT NOT NULL,
       FOREIGN KEY (client_id) REFERENCES clients(id),
       FOREIGN KEY (worker_id) REFERENCES workers(id),
       FOREIGN KEY (service_id) REFERENCES services(id)
      );
    `,
    (err) => {
      if (err) console.error("Error creating bookings table:", err.message);
      else console.log("Bookings table created.");
    }
  );

  // Table Service History
  db.query(
    `
      CREATE TABLE IF NOT EXISTS service_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        worker_id INT NOT NULL,
        service_id INT NOT NULL,
        booking_date DATETIME NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err)
        console.error("Error creating service_history table:", err.message);
      else console.log("Service History table created.");
    }
  );

  // Table Payments
  db.query(
    `
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        payment_status VARCHAR(50) NOT NULL,
        payment_date DATETIME NOT NULL,
        FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err) console.error("Error creating payments table:", err.message);
      else console.log("Payments table created.");
    }
  );

  // Table Portfolios
  db.query(
    `
      CREATE TABLE IF NOT EXISTS portfolios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        worker_id INT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err) console.error("Error creating portfolios table:", err.message);
      else console.log("Portfolios table created.");
    }
  );

  // Table Worker Availability
  db.query(
    `
      CREATE TABLE IF NOT EXISTS worker_availability (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    UNIQUE (worker_id, date, time_slot)
      );
    `,
    (err) => {
      if (err)
        console.error("Error creating worker_availability table:", err.message);
      else console.log("Worker Availability table created.");
    }
  );

  // Table Points Program
  db.query(
    `
      CREATE TABLE IF NOT EXISTS points_program (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        points INT NOT NULL DEFAULT 0,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
      );
    `,
    (err) => {
      if (err)
        console.error("Error creating points_program table:", err.message);
      else console.log("Points Program table created.");
    }
  );
  // TABLE OFFRE
  db.query(
    `
      CREATE TABLE IF NOT EXISTS offers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        code INT NOT NULL
      );
    `,
    (err) => {
      if (err) console.error("Error creating offers table:", err.message);
      else console.log("Offers table created.");
    }
  );
}
import sqlite3 from 'sqlite3';

// Connect to the SQLite database
const db = new sqlite3.Database('beauty_services.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Enable foreign key constraints
    db.run('PRAGMA foreign_keys = ON;', (err) => {
      if (err) {
        console.error('Error enabling foreign key constraints:', err.message);
      } else {
        console.log('Foreign key constraints enabled.');
      }
    });
  }
});
db.all(`PRAGMA table_info(workers);`, [], (err, rows) => {
  if (err) {
      console.error('Error fetching table info:', err.message);
      return;
  }
  console.log('Table Info:', rows);
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
    points INTEGER DEFAULT 0
  )`);

  // Create Workers table
  db.run(`CREATE TABLE IF NOT EXISTS workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    bio TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    image_url TEXT,
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

  // Create Worker_Services table
  db.run(`CREATE TABLE IF NOT EXISTS worker_services (
    worker_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    price REAL NOT NULL,
    PRIMARY KEY (worker_id, service_id),
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
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

  // Create Service History table
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

  // Create Worker Availability table
  db.run(`CREATE TABLE IF NOT EXISTS worker_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    duration INTEGER NOT NULL,
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    UNIQUE (worker_id, date, time_slot)
  )`);

  // Create Offers table
  db.run(`CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL
  )`);

  // Add indexes for optimization
  db.run('CREATE INDEX IF NOT EXISTS idx_worker_services ON worker_services(worker_id, service_id);');
  db.run('CREATE INDEX IF NOT EXISTS idx_bookings_client_worker ON bookings(client_id, worker_id);');
});

export default db;

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './db/initDatabase.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import workerRouter from './routes/workerRoute.js';
import userRouter from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 4000;

// Initialize the database
db; 

// Connect to Cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/worker', workerRouter);
app.use('/api/user', userRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API working');
});

// Start the server only if we're not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

// Export app for test files
export default app;

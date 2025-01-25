// tests/addWorker.test.js
import { addWorker } from '../controllers/workerController';
import db from '../db/initDatabase';
jest.mock('../db/initDatabase'); 

describe('addWorker', () => {
  let mockReq;
  let mockRes;
  beforeEach(() => {
    mockReq = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        category_id: 1,
        bio: 'A skilled worker',
        services: [
          { service_id: 1, price: 100 },
          { service_id: 2, price: 150 }
        ]
      },
      file: null 
    };
    mockRes = {
      json: jest.fn(),
    };
    // Mock db.run to simulate successful insert operations
    db.run.mockReset(); // Reset mock before each test
    db.run.mockImplementationOnce((query, params, callback) => {
      callback(null, { lastID: 1 }); // Simulate successful worker insert
    });
    db.run.mockImplementationOnce((query, params, callback) => {
      callback(null); // Simulate successful worker-service insert
    });
  });
  it('should return success when a worker is added', async () => {
    await addWorker(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Worker and services added successfully',
    });
  });
  it('should return error when a required field is missing', async () => {
    mockReq.body.email = '';
    await addWorker(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Missing required fields',
    });
  });
  it('should return error when email is invalid', async () => {
    mockReq.body.email = 'invalid-email';
    await addWorker(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid email address',
    });
  });
  it('should return error when password is too short', async () => {
    mockReq.body.password = 'short';
    await addWorker(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Password too short (minimum 8 characters)',
    });
  });
  it('should mock the db and check if services are inserted', async () => {
    db.run.mockImplementationOnce((query, params, callback) => callback(null, { lastID: 1 }));
    db.run.mockImplementationOnce((query, params, callback) => callback(null));
    await addWorker(mockReq, mockRes);
    expect(db.run).toHaveBeenCalledTimes(3); 
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Worker and services added successfully',
    });
  });
});



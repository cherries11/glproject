import { loginWorker } from'../controllers/workerController'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('loginWorker', () => {
  let db;
  let req;
  let res;
  beforeEach(() => {
    db = {
      get: jest.fn(),
    };
    req = {
      body: {
        email: 'testworker@example.com',
        password: 'testpassword',
      },
    };
    res = {
      json: jest.fn(),
    };
    process.env.JWT_SECRET = 'testsecret';
  });
  it('should return a token on successful login', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    db.get.mockImplementation((query, params, callback) =>
      callback(null, { id: 'worker1', email: 'testworker@example.com', password: hashedPassword })
    );
    const login = loginWorker(db);
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        token: expect.any(String), 
      })
    );
  });
  it('should return an error if worker is not found', () => {
    db.get.mockImplementation((query, params, callback) => callback(null, null));
    const login = loginWorker(db);
    login(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid credentials' });
  });
  it('should return an error for invalid password', async () => {
    const hashedPassword = await bcrypt.hash('someotherpassword', 10);
    db.get.mockImplementation((query, params, callback) =>
      callback(null, { id: 'worker1', email: 'testworker@example.com', password: hashedPassword })
    );
    const login = loginWorker(db);
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid credentials' });
  });
  it('should return a database error message on query failure', () => {
    db.get.mockImplementation((query, params, callback) =>
      callback(new Error('Database error'), null)
    );
    const login = loginWorker(db);
    login(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database error' });
  });
  it('should return an error if password comparison fails', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
      throw new Error('Comparison error');
    });
    db.get.mockImplementation((query, params, callback) =>
      callback(null, { id: 'worker1', email: 'testworker@example.com', password: 'hashedpassword' })
    );
    const login = loginWorker(db);
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Error comparing passwords' });
    jest.restoreAllMocks();
  });
});

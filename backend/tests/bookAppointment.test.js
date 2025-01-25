import { bookAppointment } from'../controllers/userController'
describe('bookAppointment', () => {
  let db;
  let req;
  let res;
  beforeEach(() => {
    db = {
      get: jest.fn(),
      run: jest.fn(),
    };
    req = {
      body: {
        userId: 'user1',
        workId: 'worker1',
        slotDate: '2025-01-30',
        slotTime: '10:00',
      },
    };
    res = {
      json: jest.fn(),
    };
  });
  it('should return success when appointment is booked', () => {
    db.get
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { id: 'worker1', slots_booked: '{}' })
      ) 
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { slots_booked: '{}' })
      ) 
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { id: 'user1', name: 'Test User' })
      ); 
    db.run.mockImplementation((query, params, callback) => callback(null));
    const book = bookAppointment(db);
    book(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Appointment booked' });
  });
  it('should return error when worker is not found', () => {
    db.get.mockImplementation((query, params, callback) => callback(null, null));
    const book = bookAppointment(db);
    book(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Worker not found' });
  });
  it('should return error when slot is not available', () => {
    db.get
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { id: 'worker1', slots_booked: '{}' })
      )
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { slots_booked: '{"2025-01-30":["10:00"]}' })
      );
    const book = bookAppointment(db);
    book(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Slot not available' });
  });
  it('should return error when user is not found', () => {
    db.get
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { id: 'worker1', slots_booked: '{}' })
      )
      .mockImplementationOnce((query, params, callback) =>
        callback(null, { slots_booked: '{}' })
      )
      .mockImplementationOnce((query, params, callback) => callback(null, null));
    const book = bookAppointment(db);
    book(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
  });
  it('should return error when database error occurs', () => {
    db.get.mockImplementation((query, params, callback) =>
      callback(new Error('Database error'), null)
    );
    const book = bookAppointment(db);
    book(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database error' });
  });
});

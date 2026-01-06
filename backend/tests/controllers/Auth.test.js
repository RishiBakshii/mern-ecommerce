const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Otp = require('../../models/OTP');
const { sendMail } = require('../../utils/Emails');

// Create a test app
const express = require('express');
const authRoutes = require('../../routes/Auth');
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Controller', () => {
  let testUser;
  const testUserData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce-test');
    }
  });

  afterAll(async () => {
    // Clean up
    await User.deleteMany({});
    await Otp.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clean up before each test
    await User.deleteMany({});
    await Otp.deleteMany({});
    jest.clearAllMocks();
  });

  describe('POST /auth/signup', () => {
    test('should create a new user successfully', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send(testUserData)
        .expect(201);

      expect(response.body.email).toBe(testUserData.email);
      expect(response.body.password).toBeUndefined();
      expect(response.body.isVerified).toBe(false);
    });

    test('should return 400 if user already exists', async () => {
      // Create user first
      await request(app)
        .post('/auth/signup')
        .send(testUserData);

      // Try to create again
      const response = await request(app)
        .post('/auth/signup')
        .send(testUserData)
        .expect(400);

      expect(response.body.message).toBe('User already exists');
    });

    test('should hash password before saving', async () => {
      // Use unique email for this test
      const uniqueUserData = {
        ...testUserData,
        email: 'hashtest@example.com'
      };
      
      await request(app)
        .post('/auth/signup')
        .send(uniqueUserData)
        .expect(201);

      const user = await User.findOne({ email: uniqueUserData.email });
      expect(user.password).not.toBe(uniqueUserData.password);
      expect(await bcrypt.compare(uniqueUserData.password, user.password)).toBe(true);
    });

    test('should set cookie on successful signup', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send(testUserData)
        .expect(201);

      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Create a user for login tests
      const hashedPassword = await bcrypt.hash(testUserData.password, 10);
      testUser = await User.create({
        ...testUserData,
        password: hashedPassword
      });
    });

    test('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: testUserData.email,
          password: testUserData.password
        })
        .expect(200);

      expect(response.body.email).toBe(testUserData.email);
      expect(response.body.password).toBeUndefined();
      expect(response.headers['set-cookie']).toBeDefined();
    });

    test('should return 404 with invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: testUserData.email,
          password: 'wrongpassword'
        })
        .expect(404);

      expect(response.body.message).toBe('Invalid Credentails');
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(404);

      expect(response.body.message).toBe('Invalid Credentails');
    });
  });

  describe('POST /auth/resend-otp', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(testUserData.password, 10);
      testUser = await User.create({
        ...testUserData,
        password: hashedPassword
      });
    });

    test('should resend OTP successfully', async () => {
      const response = await request(app)
        .post('/auth/resend-otp')
        .send({ user: testUser._id.toString() })
        .expect(201);

      expect(response.body.message).toBe('OTP sent');
      expect(sendMail).toHaveBeenCalled();
    });

    test('should return 404 if user not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .post('/auth/resend-otp')
        .send({ user: fakeId.toString() })
        .expect(404);

      expect(response.body.message).toBe('User not found');
    });

    test('should delete existing OTPs before creating new one', async () => {
      // Create an existing OTP
      await Otp.create({
        user: testUser._id,
        otp: 'hashedotp',
        expiresAt: Date.now() + 120000
      });

      await request(app)
        .post('/auth/resend-otp')
        .send({ user: testUser._id.toString() })
        .expect(201);

      const otps = await Otp.find({ user: testUser._id });
      expect(otps.length).toBe(1);
    });
  });

  describe('POST /auth/verify-otp', () => {
    let otpValue;
    let hashedOtp;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(testUserData.password, 10);
      testUser = await User.create({
        ...testUserData,
        password: hashedPassword
      });

      otpValue = '1234';
      hashedOtp = await bcrypt.hash(otpValue, 10);
      await Otp.create({
        user: testUser._id,
        otp: hashedOtp,
        expiresAt: Date.now() + 120000
      });
    });

    test('should verify OTP successfully', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          userId: testUser._id.toString(),
          otp: otpValue
        })
        .expect(200);

      expect(response.body.isVerified).toBe(true);
      
      // OTP should be deleted after verification
      const otp = await Otp.findOne({ user: testUser._id });
      expect(otp).toBeNull();
    });

    test('should return 400 for invalid OTP', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          userId: testUser._id.toString(),
          otp: '9999'
        })
        .expect(400);

      expect(response.body.message).toContain('invalid');
    });

    test('should return 404 if user not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          userId: fakeId.toString(),
          otp: otpValue
        })
        .expect(404);

      expect(response.body.message).toContain('User not Found');
    });

    test('should return 400 for expired OTP', async () => {
      // Create expired OTP
      await Otp.deleteMany({});
      await Otp.create({
        user: testUser._id,
        otp: hashedOtp,
        expiresAt: Date.now() - 1000 // Expired
      });

      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          userId: testUser._id.toString(),
          otp: otpValue
        })
        .expect(400);

      expect(response.body.message).toContain('expired');
    });
  });
});


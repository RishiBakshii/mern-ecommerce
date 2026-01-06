// Test setup file
require('dotenv').config({ path: '.env.test' });

// Set test environment variables if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.SECRET_KEY = process.env.SECRET_KEY || 'test-secret-key';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce-test';
process.env.ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
process.env.LOGIN_TOKEN_EXPIRATION = process.env.LOGIN_TOKEN_EXPIRATION || '30d';
process.env.OTP_EXPIRATION_TIME = process.env.OTP_EXPIRATION_TIME || '120000';
process.env.PASSWORD_RESET_TOKEN_EXPIRATION = process.env.PASSWORD_RESET_TOKEN_EXPIRATION || '2m';
process.env.COOKIE_EXPIRATION_DAYS = process.env.COOKIE_EXPIRATION_DAYS || '30';
process.env.PRODUCTION = process.env.PRODUCTION || 'false';

// Mock nodemailer to avoid sending actual emails during tests
jest.mock('../utils/Emails', () => ({
  sendMail: jest.fn().mockResolvedValue(true)
}));


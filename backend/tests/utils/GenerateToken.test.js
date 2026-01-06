const { generateToken } = require('../../utils/GenerateToken');
const jwt = require('jsonwebtoken');

describe('GenerateToken', () => {
  const mockPayload = {
    _id: '123',
    email: 'test@example.com',
    isVerified: true,
    isAdmin: false
  };

  beforeEach(() => {
    process.env.SECRET_KEY = 'test-secret-key';
    process.env.LOGIN_TOKEN_EXPIRATION = '30d';
    process.env.PASSWORD_RESET_TOKEN_EXPIRATION = '2m';
  });

  test('should generate a valid JWT token', () => {
    const token = generateToken(mockPayload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('should generate token that can be verified', () => {
    const token = generateToken(mockPayload);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    expect(decoded._id).toBe(mockPayload._id);
    expect(decoded.email).toBe(mockPayload.email);
  });

  test('should generate password reset token when passwordReset is true', () => {
    const token = generateToken(mockPayload, true);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    expect(decoded._id).toBe(mockPayload._id);
    expect(decoded.email).toBe(mockPayload.email);
  });

  test('should throw error with invalid secret key', () => {
    const token = generateToken(mockPayload);
    expect(() => {
      jwt.verify(token, 'wrong-secret');
    }).toThrow();
  });
});


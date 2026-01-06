const { sanitizeUser } = require('../../utils/SanitizeUser');

describe('SanitizeUser', () => {
  test('should return only safe user fields', () => {
    const user = {
      _id: '123',
      email: 'test@example.com',
      password: 'hashedpassword',
      isVerified: true,
      isAdmin: false,
      name: 'Test User',
      someOtherField: 'should not be included'
    };

    const sanitized = sanitizeUser(user);

    expect(sanitized).toEqual({
      _id: '123',
      email: 'test@example.com',
      isVerified: true,
      isAdmin: false
    });

    expect(sanitized.password).toBeUndefined();
    expect(sanitized.name).toBeUndefined();
    expect(sanitized.someOtherField).toBeUndefined();
  });

  test('should handle user with all fields', () => {
    const user = {
      _id: '456',
      email: 'admin@example.com',
      isVerified: true,
      isAdmin: true
    };

    const sanitized = sanitizeUser(user);

    expect(sanitized).toEqual({
      _id: '456',
      email: 'admin@example.com',
      isVerified: true,
      isAdmin: true
    });
  });

  test('should handle unverified user', () => {
    const user = {
      _id: '789',
      email: 'user@example.com',
      isVerified: false,
      isAdmin: false
    };

    const sanitized = sanitizeUser(user);

    expect(sanitized.isVerified).toBe(false);
    expect(sanitized.isAdmin).toBe(false);
  });
});


const { generateOTP } = require('../../utils/GenerateOtp');

describe('GenerateOTP', () => {
  test('should generate a 4-digit OTP', () => {
    const otp = generateOTP();
    expect(otp).toMatch(/^\d{4}$/);
    expect(otp.length).toBe(4);
  });

  test('should generate different OTPs on multiple calls', () => {
    const otps = new Set();
    for (let i = 0; i < 100; i++) {
      otps.add(generateOTP());
    }
    
    expect(otps.size).toBeGreaterThan(1);
  });

  test('should generate OTP as string', () => {
    const otp = generateOTP();
    expect(typeof otp).toBe('string');
  });

  test('should generate OTP between 1000 and 9999', () => {
    const otp = parseInt(generateOTP());
    expect(otp).toBeGreaterThanOrEqual(1000);
    expect(otp).toBeLessThanOrEqual(9999);
  });
});


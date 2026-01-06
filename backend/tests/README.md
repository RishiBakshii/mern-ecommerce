# Backend Tests

This directory contains unit tests for the backend API.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Make sure MongoDB is running (or use a test database):
```bash
# The tests use a separate test database by default
# Update MONGO_URI in .env.test if needed
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Structure

- `utils/` - Tests for utility functions (OTP generation, token generation, user sanitization)
- `controllers/` - Tests for API controllers (Auth, Product, Cart, etc.)

## Test Environment

Tests use a separate test database (default: `mern-ecommerce-test`) to avoid affecting development data.

Environment variables are set in `tests/setup.js`. You can create a `.env.test` file to override defaults.

## Writing New Tests

1. Create test files following the pattern: `*.test.js`
2. Use Supertest for API endpoint testing
3. Mock external services (like email) in `tests/setup.js`
4. Clean up test data in `beforeEach` or `afterEach` hooks

## Example Test

```javascript
describe('MyController', () => {
  test('should do something', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
  });
});
```


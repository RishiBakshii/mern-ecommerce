# Testing Documentation

This document provides an overview of the testing setup for the MERN Ecommerce application.

## Overview

Unit tests have been added for both the backend (Node.js/Express) and frontend (React) parts of the application.

## Backend Tests

### Setup
- **Testing Framework**: Jest
- **HTTP Testing**: Supertest
- **Location**: `backend/tests/`
- **Configuration**: `backend/jest.config.js`

### Test Files Created

1. **Utility Tests** (`backend/tests/utils/`)
   - `GenerateOtp.test.js` - Tests OTP generation
   - `GenerateToken.test.js` - Tests JWT token generation
   - `SanitizeUser.test.js` - Tests user data sanitization

2. **Controller Tests** (`backend/tests/controllers/`)
   - `Auth.test.js` - Tests authentication endpoints (signup, login, OTP verification, resend OTP)
   - `Product.test.js` - Tests product CRUD operations
   - `Cart.test.js` - Tests cart management operations

### Running Backend Tests

```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm test -- --coverage  # Run with coverage report
```

### Test Setup

- Tests use a separate test database (`mern-ecommerce-test`)
- Email sending is mocked to avoid sending actual emails
- Environment variables are configured in `backend/tests/setup.js`

## Frontend Tests

### Setup
- **Testing Framework**: Jest (via react-scripts)
- **Testing Library**: React Testing Library
- **Location**: Component files with `.test.jsx` extension
- **Setup File**: `frontend/src/setupTests.js`

### Test Files Created

1. **Component Tests**
   - `ProductCard.test.jsx` - Tests product card component
   - `Login.test.jsx` - Tests login form component
   - `HomePage.test.jsx` - Tests home page component

2. **Redux Tests**
   - `CartSlice.test.js` - Tests cart Redux slice

### Running Frontend Tests

```bash
cd frontend
npm test              # Run all tests (watch mode)
npm test -- --coverage  # Run with coverage report
```

### Test Setup

- Redux store is mocked using `configureStore`
- External dependencies (Lottie, framer-motion) are mocked
- React Router is wrapped in tests using `BrowserRouter`

## Test Coverage

The tests cover:
- ✅ Authentication flows (signup, login, OTP)
- ✅ Product management
- ✅ Cart operations
- ✅ Utility functions
- ✅ Component rendering and interactions
- ✅ Redux state management

## Adding New Tests

### Backend
1. Create test file: `backend/tests/controllers/YourController.test.js`
2. Use Supertest for API testing
3. Mock external services in `tests/setup.js`
4. Clean up test data in `beforeEach`/`afterEach`

### Frontend
1. Create test file: `YourComponent.test.jsx` next to component
2. Use React Testing Library for component testing
3. Mock Redux store using `configureStore`
4. Mock external dependencies as needed

## Notes

- Tests use separate test databases to avoid affecting development data
- Email functionality is mocked in backend tests
- All tests should be independent and not rely on execution order
- Clean up test data after each test to ensure isolation

## Next Steps

Consider adding:
- Integration tests for complete user flows
- E2E tests using Cypress or Playwright
- Performance tests
- API contract tests
- More comprehensive component tests


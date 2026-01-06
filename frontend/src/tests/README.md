# Frontend Tests

This directory contains unit tests for the React frontend.

## Setup

The frontend already has testing libraries installed:
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

## Running Tests

Run all tests:
```bash
cd frontend
npm test
```

Run tests in watch mode (default):
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Structure

- Component tests: `*.test.jsx` files next to components
- Redux slice tests: `*.test.js` files next to slices
- Page tests: `*.test.jsx` files next to pages

## Writing New Tests

1. Create test files following the pattern: `*.test.jsx` or `*.test.js`
2. Use React Testing Library for component testing
3. Mock Redux store using `configureStore` from `@reduxjs/toolkit`
4. Mock external dependencies (Lottie, framer-motion, etc.)

## Example Test

```javascript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```


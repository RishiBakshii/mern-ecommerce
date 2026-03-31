// TEST DATA REPOSITORY
// Purpose: Centralized test data used across all test files
// Change: Created to maintain DRY principle and easy data updates

// CHANGE: Create testData object with predefined test values
// Reason: Avoid hardcoding credentials and payloads in test files
// Problem Solved: Update test data in one place instead of multiple files
// Impact: Easy to change test users/products without modifying test logic
const testData = {
  // CHANGE: Users object with seeded demo accounts
  // Reason: Use consistent test accounts from backend seed
  // Problem Solved: Tests use same credentials as backend seed data
  // Impact: Login tests work with real seeded accounts
  users: {
    // CHANGE: Admin user account
    // Reason: Used for admin-level operations if needed
    // Note: Currently has same permissions as regular user in this setup
    admin: {
      email: "demo@gmail.com",
      password: "testpass123",
    },

    // CHANGE: Regular user account
    // Reason: Default user for non-admin tests
    // Impact: Can run multiple tests with different user accounts
    user: {
      email: "demo2@gmail.com",
      password: "testpass456",
    },
  },

  // CHANGE: Product test data
  // Reason: Test payloads for product creation/update tests
  // Impact: Standardized product data across all product tests
  products: {
    // CHANGE: Valid product object
    // Reason: Template for successful product creation
    // Problem Solved: Tests can create products with known valid schema
    // Impact: Reduces test data setup complexity
    validProduct: {
      name: "Test Product",
      price: 99.99,
      category: "Electronics",
      description: "A test product for API testing",
    },

    // CHANGE: Invalid product object
    // Reason: Template for negative testing
    // Problem Solved: Tests that verify error handling use same invalid data
    // Impact: Consistent error test behavior
    invalidProduct: {
      name: "",
      price: -10,
    },
  },

  // CHANGE: Category test data
  // Reason: Test payloads for category-related tests
  // Impact: Standardized category data
  categories: {
    // CHANGE: Valid category object
    // Reason: Template for category creation tests
    validCategory: {
      name: "Test Category",
      description: "A test category",
    },
  },
};

// CHANGE: Create data generator functions
// Reason: Generate unique test data for each test run
// Problem Solved: Prevents conflicts when multiple tests run in parallel
// Impact: Each test gets unique product/user data with timestamps
const generateRandomData = {
  // CHANGE: Generate unique product each time
  // Reason: Multiple tests can't use same product ID
  // Problem Solved: Date.now() ensures uniqueness across all test runs
  // Impact: Tests can run in parallel without conflicts
  product: () => ({
    name: `Test Product ${Date.now()}`,
    price: Math.random() * 100,
    category: "Test",
    description: "Random test product",
  }),

  // CHANGE: Generate unique user each time
  // Reason: Can't create duplicate emails in database
  // Problem Solved: Date.now() creates unique email for each test
  // Impact: Registration tests can run multiple times
  user: () => ({
    email: `test${Date.now()}@example.com`,
    password: "test123",
  }),
};

// CHANGE: Export ES6 and CommonJS styles
// Reason: Support both import/require syntax
// Note: Both syntaxes point to same data
export default { testData, generateRandomData };

// CHANGE: CommonJS export for Playwright (which uses require())
// Reason: Playwright test runner uses CommonJS requires
// Impact: Tests can import using const { testData } = require()
module.exports = { testData, generateRandomData };

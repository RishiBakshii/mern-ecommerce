// PLAYWRIGHT CONFIGURATION FILE
// Purpose: Centralized configuration for Playwright test runner
// Change: Created to establish test framework foundation for API automation

import { defineConfig } from "@playwright/test";

export default defineConfig({
  // CHANGE: Define where test files are located
  // Reason: Playwright needs to know where to find test files
  // Impact: All .spec.js files in ./api/tests will be discovered and executed
  testDir: "./api/tests",

  // CHANGE: Specify output directory for test results
  // Reason: Organize test failures and artifacts separate from source code
  // Impact: Enables easy reporting and debugging of failed tests
  outputDir: "./test-results",

  // CHANGE: Configure multiple reporters for test results
  // Reason: HTML report for visual inspection, JSON for CI/CD integration
  // Impact: Supports both human-readable and machine-readable reports
  reporter: [["html"], ["json", { outputFile: "results.json" }]],

  use: {
    // CHANGE: Set baseURL with environment fallback
    // Reason: Allows switching between environments (dev/staging/prod) without code changes
    // Problem Solved: Enables flexible testing against different backend instances
    // Impact: Tests can reference endpoints as "/products" instead of full URLs
    baseURL: process.env.BASE_URL || "http://localhost:8000",

    // CHANGE: Add Content-Type header to all requests
    // Reason: Backend expects JSON content-type for API requests
    // Problem Solved: Prevents 415 "Unsupported Media Type" errors
    // Impact: All requests automatically include proper content-type
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },

  projects: [
    {
      // CHANGE: Define API test project configuration
      // Reason: Separate API tests from other test types (UI, E2E)
      // Impact: Allows running only API tests when needed
      name: "api-tests",
      testMatch: "**/*.spec.js",

      // CHANGE: Pass environment variables to test context
      // Reason: Tests need access to API credentials and configuration
      // Problem Solved: Enables environment-specific testing without hardcoding secrets
      use: {
        ...process.env,
      },
    },
  ],

  // CHANGE: Register global setup hook
  // Reason: Run initialization before any tests (e.g., database seeding)
  // Impact: Ensures test environment is properly configured before test execution
  globalSetup: require.resolve("./api/config/global-setup.js"),

  // CHANGE: Register global teardown hook
  // Reason: Clean up resources after all tests complete (e.g., close connections)
  // Impact: Prevents resource leaks and ensures clean test environment
  globalTeardown: require.resolve("./api/config/global-teardown.js"),
});

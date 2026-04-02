// GLOBAL SETUP HOOK
// Purpose: Execute initialization logic before all tests run
// Change: Created to load environment variables and setup test context

// CHANGE: Load environment variables from .env file
// Reason: Make API credentials available as process.env before tests run
// Problem Solved: Ensures credentials are loaded before any test is executed
// Impact: All tests can access environment variables via process.env
require("dotenv").config({ path: `../.env.${process.env.ENV || "dev"}` });

// CHANGE: Import environment helper
// Reason: Access environment configuration in setup phase
// Impact: Enables environment-aware setup logic
const { getEnvironment } = require("./environments");

// CHANGE: Define async global setup function
// Reason: Playwright calls this hook before running any tests
// Problem Solved: Centralizes one-time setup that needs to happen before tests
// Impact: Prevents setup code duplication across test files
async function globalSetup() {
  // CHANGE: Get environment configuration
  // Reason: Set up context for the correct environment
  // Impact: Setup logic adapts to dev/staging/prod
  const env = getEnvironment(process.env.ENV || "dev");

  // CHANGE: Log setup completion
  // Reason: Verify setup ran successfully in CI/CD logs
  // Problem Solved: Makes CI/CD debugging easier
  // Impact: Logs confirm test environment initialization
  console.log(
    "Global setup completed for environment:",
    process.env.ENV || "dev",
  );

  // FUTURE: Add actual setup steps here (e.g., database seeding, auth tokens)
}

// CHANGE: Export setup function
// Reason: Playwright requires this export to discover and run the hook
// Impact: globalSetup specified in playwright.config.js will call this function
module.exports = globalSetup;

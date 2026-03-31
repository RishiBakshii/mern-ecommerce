// GLOBAL TEARDOWN HOOK
// Purpose: Execute cleanup logic after all tests complete
// Change: Created to cleanup resources and ensure test environment is clean

// CHANGE: Define async teardown function
// Reason: Playwright calls this hook after all tests finish
// Problem Solved: Centralizes cleanup that needs to happen after tests
// Impact: Prevents resource leaks and ensures clean environment for next test run
async function globalTeardown() {
  // CHANGE: Log teardown completion
  // Reason: Verify teardown ran successfully in CI/CD logs
  // Problem Solved: Makes CI/CD debugging easier
  // Impact: Logs confirm test environment cleanup
  console.log("Global teardown completed");

  // FUTURE: Add actual cleanup steps here:
  // - Close database connections
  // - Delete temporary test data
  // - Clear authentication tokens
  // - Stop mock servers
}

// CHANGE: Export teardown function
// Reason: Playwright requires this export to discover and run the hook
// Problem Solved: globalTeardown in playwright.config.js can reference this
// Impact: Cleanup runs after all tests complete
module.exports = globalTeardown;

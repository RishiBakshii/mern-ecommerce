// AUTHENTICATION HELPER CLASS
// Purpose: Encapsulate authentication flows (login, logout, token management)
// Change: Created to centralize auth logic and cookie handling

// CHANGE: Import ApiHelper for HTTP requests
// Reason: Reuse the consistent HTTP client with auth headers
// Impact: Login/logout use same baseURL and error handling as other API calls
const ApiHelper = require("./ApiHelper");

// CHANGE: Create AuthHelper class
// Reason: Separate auth concerns from general API requests
// Problem Solved: Tests can focus on business logic, not auth plumbing
// Impact: Single source of truth for authentication workflows
class AuthHelper {
  // CHANGE: Constructor accepts environment parameter
  // Reason: Support auth against different environments
  // Impact: Can test login/logout against dev/staging/prod
  constructor(env = "dev") {
    // CHANGE: Create ApiHelper instance
    // Reason: Delegate HTTP requests to ApiHelper
    this.apiHelper = new ApiHelper(env);

    // CHANGE: Initialize token property
    // Reason: Track authentication state
    // Issue: Cookies are HTTP-only, so we track a simple flag
    this.token = null;
  }

  // CHANGE: Async initialization method
  // Reason: Call ApiHelper's async init() before making requests
  // Impact: HTTP context is ready when login() is called
  async init() {
    await this.apiHelper.init();
  }

  // CHANGE: Login method with custom response handling (MODIFIED)
  // Reason: Backend doesn't return token in response; token is in HTTP-only cookie
  // Problem Solved: Still need to communicate authentication state to tests
  // Impact: Tests can track if user is authenticated
  async login(credentials) {
    // CHANGE: Call login endpoint directly via context
    // Reason: Use raw context to capture cookie behavior from backend
    // Problem Solved: Playwright's context automatically manages HTTP-only cookies
    // Impact: Subsequent requests include cookies automatically
    const response = await this.apiHelper.context.post("/auth/login", {
      data: credentials,
    });

    // CHANGE: Set token flag on successful login
    // Reason: Mark that authentication is active
    // Problem Solved: Can't access HTTP-only cookie, so use simple flag
    // Impact: Tests can check if user is logged in
    this.token = "authenticated";

    // CHANGE: Return response with status, body, headers
    // Reason: Caller needs to verify login success and inspect response
    // Impact: Tests can assert on login status and user data
    return {
      status: response.status(),
      body: await response.json().catch(() => null),
      headers: response.headers(),
      ok: response.ok(),
    };
  }

  // CHANGE: Logout method
  // Reason: Cleanup authentication state
  // Impact: Subsequent requests won't include auth tokens
  async logout() {
    // CHANGE: Call logout endpoint via ApiHelper
    // Reason: Use consistent error handling and response parsing
    const response = await this.apiHelper.post("/auth/logout");

    // CHANGE: Clear token flag on logout
    // Reason: Mark that authentication is inactive
    // Impact: Next requests will not be authenticated
    this.token = null;

    return response;
  }

  // CHANGE: Getter for token
  // Reason: Allow tests to check if user is authenticated
  // Impact: Tests can skip auth-required endpoints if not logged in
  getToken() {
    return this.token;
  }

  // CHANGE: Cleanup method
  // Reason: Cleanup HTTP context resources
  // Problem Solved: Prevents resource leaks in test runner
  // Impact: Proper resource cleanup after tests complete
  async close() {
    await this.apiHelper.close();
  }
}

// CHANGE: Export AuthHelper class
// Reason: Tests need to import and use this class
// Impact: Enables centralized auth logic across test suite
module.exports = AuthHelper;

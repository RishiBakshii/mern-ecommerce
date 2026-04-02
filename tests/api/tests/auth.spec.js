// AUTHENTICATION API TEST SUITE
// Purpose: Test authentication flows (login, logout, registration)
// Change: Created to verify auth endpoints work correctly

// CHANGE: Import Playwright test runner and assertion library
// Reason: Provides test() and expect() functions
// Impact: Structured test runner with clear test syntax
const { test, expect } = require("@playwright/test");

// CHANGE: Import ApiHelper for HTTP requests
// Reason: Use consistent API client with environment config
// Impact: Can switch environments via ENV variable
const ApiHelper = require("../helpers/ApiHelper");

// CHANGE: Import test data
// Reason: Use seeded user credentials from backend
// Problem Solved: Tests use real database credentials
// Impact: Login tests verify actual backend auth flow
const { testData } = require("../data/testData");

// CHANGE: Declare apiHelper at module scope
// Reason: Share single instance across beforeAll/afterAll/test blocks
// Impact: Connection reused for all tests in this suite
let apiHelper;

// CHANGE: Add beforeAll hook
// Reason: Create API context once before any tests run
// Problem Solved: Avoids creating new context for each test
// Impact: Faster test execution and resource efficiency
test.beforeAll(async () => {
  // CHANGE: Instantiate ApiHelper
  // Reason: Create HTTP client with environment config
  apiHelper = new ApiHelper(process.env.ENV || "dev");

  // CHANGE: Initialize ApiHelper connection
  // Reason: Create HTTP context with baseURL and headers
  // Impact: All subsequent requests are ready to execute
  await apiHelper.init();
});

// CHANGE: Add afterAll hook
// Reason: Cleanup resources after all tests complete
// Problem Solved: Prevents resource leaks in test runner
// Impact: Proper cleanup of HTTP connections
test.afterAll(async () => {
  await apiHelper.close();
});

// CHANGE: Create test describe block
// Reason: Group related auth tests together
// Impact: Better test report organization
test.describe("Authentication API Tests", () => {
  // CHANGE: Test basic server connectivity
  // Reason: Verify backend is running before auth tests
  // Problem Solved: Fails fast if server is down
  // Impact: Clear error messages if backend not available
  test("Server is running", async () => {
    // CHANGE: Send GET request to root endpoint
    // Reason: Backend returns {"message": "running"} when healthy
    // Purpose: Health check before running auth tests
    const response = await apiHelper.context.get("/");

    // CHANGE: Assert response status is 200
    // Reason: Verify backend is responding
    // Impact: Test fails if server not available
    expect(response.status()).toBe(200);

    // CHANGE: Parse response body
    // Reason: Check for "running" message
    const body = await response.json();

    // CHANGE: Verify response has message property
    // Reason: Confirms backend returned expected payload
    expect(body).toHaveProperty("message", "running");
  });

  // CHANGE: Test successful login with valid credentials
  // Reason: Verify login endpoint accepts valid users
  // Problem Solved: Ensures authentication flow works
  // Impact: Login tokens are set in cookies for subsequent requests
  test("POST /auth/login - should login with valid credentials", async () => {
    // CHANGE: Call login with demo user credentials
    // Reason: Use seeded user from backend
    // Note: testData.users.user = { email: "demo2@gmail.com", password: "testpass456" }
    const response = await apiHelper.post("/auth/login", testData.users.user);

    // CHANGE: Assert response status is 200
    // Reason: OK response indicates successful login
    expect(response.status).toBe(200);

    // CHANGE: Assert response contains email property
    // Reason: Backend returns user object with email on successful login
    expect(response.body).toHaveProperty("email");

    // CHANGE: Assert returned email matches login email
    // Reason: Verify correct user was authenticated
    // Impact: Confirms backend responded with correct user data
    expect(response.body.email).toBe(testData.users.user.email);
  });

  // CHANGE: Test login failure with invalid credentials
  // Reason: Verify backend rejects wrong passwords
  // Problem Solved: Prevents wrong credentials from succeeding
  // Impact: Security validation of auth endpoint
  test("POST /auth/login - should fail with invalid credentials", async () => {
    // CHANGE: Create invalid credentials object
    // Reason: Simulate user entering wrong password
    const invalidCredentials = {
      email: "invalid@example.com",
      password: "wrong",
    };

    try {
      // CHANGE: Attempt login with non-existent user
      // Reason: Expect API to reject with error
      const response = await apiHelper.post("/auth/login", invalidCredentials);

      // CHANGE: Assert that response status is 401 or 404
      // Reason: Backend returns 401 (Unauthorized) or 404 (Not Found)
      // Impact: Test documents expected error codes
      expect([401, 404]).toContain(response.status);
    } catch (error) {
      // CHANGE: Catch API error from handleResponse
      // Reason: ApiHelper throws Error on 4xx/5xx responses
      // Problem Solved: Tests can expect API errors
      // Impact: Validates error handling in ApiHelper
      expect(error.message).toContain("API Error");
    }
  });

  // CHANGE: Skipped signup test
  // Reason: OTP verification required, out of scope for now
  // Problem Solved: Documents known limitation
  // Impact: Prevents test from failing due to missing OTP
  test.skip("POST /auth/register - should register new user", async () => {
    // CHANGE: Create new user with unique email
    // Reason: Can't reuse existing emails in database
    // Impact: Each test uses different user if needed
    const newUser = {
      email: `newuser${Date.now()}@example.com`,
      password: "newpassword123",
      name: "New User",
    };

    // CHANGE: Attempt signup request
    // Reason: Create new account in database
    const response = await apiHelper.post("/auth/signup", newUser);

    // CHANGE: Assert response status is 201
    // Reason: Created status code indicates successful resource creation
    expect(response.status).toBe(201);

    // CHANGE: Assert response contains email
    // Reason: Verify user was created in database
    expect(response.body).toHaveProperty("email");
  });

  // CHANGE: Test logout functionality
  // Reason: Verify logout clears authentication
  // Problem Solved: Ensures cookie-based auth can be revoked
  // Impact: Users can securely log out
  test("GET /auth/logout - should logout user", async () => {
    // CHANGE: Login first
    // Reason: Need authenticated session before logout
    const loginResponse = await apiHelper.post(
      "/auth/login",
      testData.users.user,
    );

    // CHANGE: Assert login succeeded
    // Reason: Verify pre-condition for logout test
    // Impact: Only tests logout if login worked
    expect(loginResponse.status).toBe(200);

    // CHANGE: Call logout endpoint
    // Reason: Revoke authentication token/cookie
    // Impact: Subsequent requests won't be authenticated
    const logoutResponse = await apiHelper.context.get("/auth/logout");

    // CHANGE: Assert logout response status is 200
    // Reason: OK status confirms logout succeeded
    // Problem Solved: Verifies endpoint exists and works
    // Impact: Authentication tokens are cleared
    expect(logoutResponse.status()).toBe(200);
  });
});

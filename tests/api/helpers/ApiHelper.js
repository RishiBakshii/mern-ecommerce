// API HELPER CLASS
// Purpose: Centralized HTTP client wrapper for Playwright API testing
// Change: Created to provide consistent request handling across all tests

// CHANGE: Import Playwright's request module
// Reason: Use Playwright's built-in HTTP client instead of axios/node-fetch
// Problem Solved: Integrates seamlessly with Playwright test runner
// Impact: Inherits Playwright context (cookies, auth) automatically
const { request } = require("@playwright/test");

// CHANGE: Import environment configuration helper
// Reason: Support configurable baseURL and headers per environment
// Impact: Same tests run against dev/staging/prod
const { getEnvironment } = require("../config/environments");

// CHANGE: Create ApiHelper class to encapsulate API interactions
// Reason: DRY principle - single source for HTTP methods
// Problem Solved: Prevents code duplication across test files
// Impact: Easy to apply global changes (headers, auth, error handling) in one place
class ApiHelper {
  // CHANGE: Constructor accepts environment parameter
  // Reason: Allow tests to instantiate helper for different environments
  // Impact: Flexibility to test against dev/staging/prod
  constructor(env = "dev") {
    // CHANGE: Store environment configuration
    // Reason: Use throughout class for baseURL and headers
    this.env = getEnvironment(env);

    // CHANGE: Initialize context as null
    // Reason: Context created on demand in init() method
    this.context = null;
  }

  // CHANGE: Async initialization method
  // Reason: Playwright's request.newContext() is async
  // Problem Solved: Separates constructor (sync) from setup (async)
  // Impact: Tests call await apiHelper.init() before making requests
  async init() {
    // CHANGE: Create Playwright request context
    // Reason: Manages cookies, headers, and base URL for all requests
    // Impact: All requests made through this context inherit these settings
    this.context = await request.newContext({
      // CHANGE: Set baseURL for all requests
      // Reason: Can use relative paths like "/products" instead of full URLs
      // Impact: Easier to read and maintain test code
      baseURL: this.env.baseURL,

      // CHANGE: Add Content-Type header globally
      // Reason: Backend requires JSON content-type
      // Problem Solved: Prevents manual header addition in every request
      // Impact: Reduces boilerplate code in tests
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        // CHANGE: Conditionally add API Key if present
        // Reason: Some environments require API keys for authentication
        // Impact: Automatically authenticates requests when needed
        ...(this.env.apiKey && { "X-API-Key": this.env.apiKey }),
        // CHANGE: Conditionally add Bearer token if present
        // Reason: Some environments use token-based authentication
        // Impact: Automatically includes auth token in all requests
        ...(this.env.token && { Authorization: `Bearer ${this.env.token}` }),
      },
    });
  }

  // CHANGE: GET request method
  // Reason: Standardized way to fetch data from API
  // Problem Solved: Applies consistent error handling via handleResponse
  // Impact: Tests don't need to check response.status manually
  async get(endpoint, params = {}) {
    const response = await this.context.get(endpoint, { params });
    return this.handleResponse(response);
  }

  // CHANGE: POST request method
  // Reason: Standardized way to create resources on API
  // Problem Solved: Applies consistent error handling
  // Impact: Automatic error throwing on 4xx/5xx responses
  async post(endpoint, data = {}) {
    const response = await this.context.post(endpoint, { data });
    return this.handleResponse(response);
  }

  // CHANGE: PUT request method
  // Reason: Standardized way to fully update resources on API
  // Problem Solved: Consistent with other HTTP methods
  // Impact: Type-safe HTTP interface
  async put(endpoint, data = {}) {
    const response = await this.context.put(endpoint, { data });
    return this.handleResponse(response);
  }

  // CHANGE: PATCH request method (ADDED)
  // Reason: Support partial updates in backend API
  // Problem Solved: Previously missing - only GET/POST/PUT/DELETE existed
  // Impact: Can update product properties (e.g., title) without full payload
  async patch(endpoint, data = {}) {
    const response = await this.context.patch(endpoint, { data });
    return this.handleResponse(response);
  }

  // CHANGE: DELETE request method
  // Reason: Standardized way to delete resources from API
  // Problem Solved: Soft-delete support with error handling
  // Impact: Consistent deletion workflow across tests
  async delete(endpoint) {
    const response = await this.context.delete(endpoint);
    return this.handleResponse(response);
  }

  // CHANGE: Unified response handling method (ADDED)
  // Reason: Centralize response parsing and error checking
  // Problem Solved: Previously each test had to check response.status() manually
  // Impact: Automatic error throwing on API errors, cleaner test code
  async handleResponse(response) {
    // CHANGE: Extract HTTP status code
    // Reason: Check for errors (4xx/5xx)
    // Impact: Used to determine if request succeeded
    const status = response.status();

    // CHANGE: Parse JSON response body with fallback
    // Reason: Some error responses might not be valid JSON
    // Problem Solved: .catch(() => null) prevents crash on non-JSON responses
    // Impact: Can safely access response.body in all cases
    const body = await response.json().catch(() => null);

    // CHANGE: Extract response headers
    // Reason: Access to metadata like content-type, auth tokens
    // Impact: Tests can validate header responses
    const headers = response.headers();

    // CHANGE: Throw error on 4xx/5xx responses
    // Reason: Fail-fast approach - tests expect success exceptions don't propagate
    // Problem Solved: Tests don't need to check response.status after API call
    // Impact: Simpler test code, clearer failure reasons
    if (status >= 400) {
      throw new Error(
        `API Error: ${status} - ${body?.message || "Unknown error"}`,
      );
    }

    // CHANGE: Return structured response object
    // Reason: Provide consistent interface for all methods
    // Impact: Tests access response.status, response.body, response.headers
    return {
      status,
      body,
      headers,
      ok: response.ok(),
    };
  }

  // CHANGE: Cleanup method
  // Reason: Stop using HTTP context resources
  // Problem Solved: Prevents resource leaks in test runner
  // Impact: Proper resource cleanup after tests complete
  async close() {
    if (this.context) {
      await this.context.dispose();
    }
  }
}

// CHANGE: Export ApiHelper class
// Reason: Tests and AuthHelper need to import this class
// Impact: Enables reusability across test suites
module.exports = ApiHelper;

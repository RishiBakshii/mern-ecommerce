// ENVIRONMENT CONFIGURATION MODULE
// Purpose: Centralize all environment-specific API configurations
// Change: Created to support multi-environment testing (dev/staging/prod)

// CHANGE: Define environment configurations object
// Reason: Separate credentials and base URLs for different environments
// Problem Solved: Allows same tests to run against dev/staging/prod without modification
// Impact: Easy switching between environments via ENV variable
const environments = {
  // CHANGE: Development environment configuration
  // Reason: Local testing during development
  // Impact: Points to localhost API server
  dev: {
    baseURL: "http://localhost:8000/api",
    apiKey: process.env.DEV_API_KEY,
    token: process.env.DEV_TOKEN,
  },

  // CHANGE: Staging environment configuration
  // Reason: Test against production-like environment before release
  // Impact: Catches environment-specific issues before production deployment
  staging: {
    baseURL: "https://staging-api.example.com/api",
    apiKey: process.env.STAGING_API_KEY,
    token: process.env.STAGING_TOKEN,
  },

  // CHANGE: Production environment configuration
  // Reason: Validate fixes against live production API
  // Problem Solved: Enables production smoke testing and validation
  // Impact: Catches critical issues affecting real users
  prod: {
    baseURL: "https://api.example.com/api",
    apiKey: process.env.PROD_API_KEY,
    token: process.env.PROD_TOKEN,
  },
};

// CHANGE: Helper function to retrieve environment config
// Reason: Provides single source of truth for environment selection
// Problem Solved: Defaults to dev if environment not specified, prevents errors
// Impact: Tests can safely call getEnvironment() without error handling
const getEnvironment = (env = "dev") => {
  return environments[env] || environments.dev;
};

module.exports = { environments, getEnvironment };

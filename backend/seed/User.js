// USER SEED DATA
// Purpose: Populate database with test user accounts
// Change: Created to provide known credentials for authentication testing

// CHANGE: Import User model
// Reason: Access User collection and schema
// Impact: Can insert user documents into database
const User = require("../models/User");

// CHANGE: Define test user data
// Reason: Create predefined accounts for testing
// Problem Solved: Tests can login with known credentials
// Impact: Authentication tests have consistent data
const users = [
  {
    // CHANGE: Hardcoded MongoDB ObjectId
    // Reason: Allows referencing same user across multiple test runs
    // Impact: Tests can rely on consistent user ID
    _id: "65b8e564ea5ce114184ccb96",

    // CHANGE: Test user name
    // Reason: Identify user in database
    name: "demo user",

    // CHANGE: Test user email for login
    // Reason: Primary credential for authentication
    // Problem Solved: Tests can login with this email
    // Impact: Email credentials match what tests use
    email: "demo@gmail.com",

    // CHANGE: Hashed password (bcrypt)
    // Reason: Don't store plain text passwords
    // Note: Hash corresponds to "testpass123"
    // Problem Solved: Secure storage of credentials
    // Impact: Password verification works during login
    password: "$2a$10$3QAnbr6k5J.dgwio83UfxOhoUuuk9tVshx3iMjquIWzrbGG/Mh67y",

    // CHANGE: Mark user as verified
    // Reason: Skip email verification flow in tests
    // Problem Solved: Can immediately login without OTP
    // Impact: Tests run faster without waiting for email
    isVerified: true,

    // CHANGE: Mark as non-admin
    // Reason: Standard user permissions for most tests
    isAdmin: false,

    __v: 0,
  },
  {
    // CHANGE: Second test user with different ID
    // Reason: Test multiple user scenarios
    // Impact: Can test user-specific operations
    _id: "65c2526fdcd9253acfbaa731",

    name: "rishibakshi",

    // CHANGE: Different email for second user
    // Reason: Login different accounts in different tests
    email: "demo2@gmail.com",

    // CHANGE: Different password hash
    // Reason: Multiple user accounts for testing
    // Note: Hash corresponds to "testpass456"
    password: "$2a$10$JTuH41aUNUgqKIz.3wLa5u7/OK2WQgSav7E61uFX/r70JKt/.uRKK",

    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
];

// CHANGE: Export seed function
// Reason: seed.js imports and calls this function
// Impact: Users inserted into database during seeding
exports.seedUser = async () => {
  try {
    // CHANGE: Insert all user documents
    // Reason: Populate users collection with test data
    // Problem Solved: Database has known user accounts
    // Impact: Tests can authenticate with these credentials
    await User.insertMany(users);

    // CHANGE: Log successful seeding
    // Reason: Confirm users were inserted
    console.log("User seeded successfully");
  } catch (error) {
    // CHANGE: Log seeding errors
    // Reason: Diagnose insertion failures
    console.log(error);
  }
};

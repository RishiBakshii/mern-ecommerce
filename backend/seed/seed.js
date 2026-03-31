// SEED DATA ORCHESTRATOR
// Purpose: Coordinate seeding of all database collections with test data
// Change: Created to populate test database with consistent starter data

// CHANGE: Import all seed functions
// Reason: Coordinate seeding across all data types
// Problem Solved: Single entry point to seed entire database
// Impact: Easy to seed and reset database for tests
const { seedBrand } = require("./Brand");
const { seedCategory } = require("./Category");
const { seedProduct } = require("./Product");
const { seedUser } = require("./User");
const { seedAddress } = require("./Address");
const { seedWishlist } = require("./Wishlist");
const { seedCart } = require("./Cart");
const { seedReview } = require("./Review");
const { seedOrder } = require("./Order");

// CHANGE: Import database connection
// Reason: Connect to MongoDB before seeding
// Impact: Can insert data into database
const { connectToDB } = require("../database/db");

// CHANGE: Define main seed function
// Reason: Orchestrate seeding in correct order
// Problem Solved: Enforce dependency order (brands before products)
// Impact: Foreign key references exist when creating dependent documents
const seedData = async () => {
  try {
    // CHANGE: Connect to MongoDB
    // Reason: Establish database connection
    // Problem Solved: Prevents "not connected" errors
    // Impact: Can execute insert operations
    await connectToDB();

    // CHANGE: Log start message
    // Reason: Confirm seeding started
    console.log("Seed [started] please wait..");

    // CHANGE: Seed brands first
    // Reason: Products reference brands as foreign keys
    // Problem Solved: Creates brand documents before product creation
    // Impact: Product inserts don't fail due to missing brands
    await seedBrand();

    // CHANGE: Seed categories second
    // Reason: Products reference categories as foreign keys
    // Impact: Products can reference existing categories
    await seedCategory();

    // CHANGE: Seed products after categories and brands
    // Reason: Products need valid category and brand ObjectIds
    // Problem Solved: Foreign key references exist
    // Impact: Product documents create successfully
    await seedProduct();

    // CHANGE: Seed users for authentication tests
    // Reason: Tests need existing user accounts to login
    // Problem Solved: Don't need to manually create users for testing
    // Impact: Login tests work with seeded credentials
    await seedUser();

    // CHANGE: Seed addresses for user profiles
    // Reason: Provides shipping addresses for orders
    await seedAddress();

    // CHANGE: Seed wishlist for product saves
    // Reason: Store user favorites for testing
    await seedWishlist();

    // CHANGE: Seed cart for shopping experience
    // Reason: Test product additions to cart
    await seedCart();

    // CHANGE: Seed reviews for product feedback
    // Reason: Test product ratings and comments
    await seedReview();

    // CHANGE: Seed orders for purchase flow
    // Reason: Test complete order lifecycle
    await seedOrder();

    // CHANGE: Log completion message
    // Reason: Confirm seeding finished successfully
    console.log("Seed completed..");
  } catch (error) {
    // CHANGE: Catch and log errors
    // Reason: Display seed failures in console
    console.log(error);
  }
};

// CHANGE: Execute seed function
// Reason: Run seeding when this file is executed
seedData();

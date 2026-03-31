// CATEGORY SEED DATA
// Purpose: Populate database with product category information
// Change: Created to provide known categories for product classification

// CHANGE: Import Category model
// Reason: Access Category collection and schema
// Impact: Can insert category documents into database
const Category = require("../models/Category");

// CHANGE: Define category list with hardcoded ObjectIds
// Reason: Reference categories in product creation with fixed IDs
// Problem Solved: Products can assign consistent category ID across multiple runs
// Impact: Stable foreign key relationships in product documents
const categories = [
  // CHANGE: Each category has unique ObjectId and name
  // Reason: Create distinct product categories
  // Impact: Products can be classified and filtered by category
  { _id: "65a7e24602e12c44f599442c", name: "smartphones" },
  { _id: "65a7e24602e12c44f599442d", name: "laptops" },
  { _id: "65a7e24602e12c44f599442e", name: "fragrances" },
  { _id: "65a7e24602e12c44f599442f", name: "skincare" },
  { _id: "65a7e24602e12c44f5994430", name: "groceries" },
  { _id: "65a7e24602e12c44f5994431", name: "home-decoration" },
  { _id: "65a7e24602e12c44f5994432", name: "furniture" },
  { _id: "65a7e24602e12c44f5994433", name: "tops" },
  { _id: "65a7e24602e12c44f5994434", name: "womens-dresses" },
  { _id: "65a7e24602e12c44f5994435", name: "womens-shoes" },
  { _id: "65a7e24602e12c44f5994436", name: "mens-shirts" },
  { _id: "65a7e24602e12c44f5994437", name: "mens-shoes" },
  { _id: "65a7e24602e12c44f5994438", name: "mens-watches" },
  { _id: "65a7e24602e12c44f5994439", name: "womens-watches" },
  { _id: "65a7e24602e12c44f599443a", name: "womens-bags" },
  { _id: "65a7e24602e12c44f599443b", name: "womens-jewellery" },
  { _id: "65a7e24602e12c44f599443c", name: "sunglasses" },
  { _id: "65a7e24602e12c44f599443d", name: "automotive" },
  { _id: "65a7e24602e12c44f599443e", name: "motorcycle" },
  { _id: "65a7e24602e12c44f599443f", name: "lighting" },
];

// CHANGE: Export seed function
// Reason: seed.js imports and calls this function
// Impact: Categories inserted into database during seeding
exports.seedCategory = async () => {
  try {
    // CHANGE: Insert all category documents
    // Reason: Populate categories collection with test data
    // Problem Solved: Database has known categories to reference
    // Impact: Products can assign consistent categories
    await Category.insertMany(categories);

    // CHANGE: Log successful seeding
    // Reason: Confirm categories were inserted
    console.log("Category seeded successfully");
  } catch (error) {
    // CHANGE: Log seeding errors
    // Reason: Diagnose insertion failures
    console.log(error);
  }
};

const Product = require("../models/Product");

// Create a new product
exports.create = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error adding product. Please try again later." });
  }
};

// Get all products with filters, sorting, and pagination
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 10; // Default page size

    // Apply filters
    if (req.query.brand) {
      filter.brand = { $in: req.query.brand.split(",") };
    }

    if (req.query.category) {
      filter.category = { $in: req.query.category.split(",") };
    }

    if (req.query.user) {
      filter.isDeleted = false; // Only fetch active products
    }

    // Apply sorting
    if (req.query.sort) {
      const order = req.query.order === "desc" ? -1 : 1;
      sort[req.query.sort] = order;
    }

    // Apply pagination
    if (req.query.page && req.query.limit) {
      limit = parseInt(req.query.limit, 10);
      skip = limit * (parseInt(req.query.page, 10) - 1);
    }

    // Fetch total count and results
    const totalDocs = await Product.countDocuments(filter);
    const results = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("brand");

      console.log("results = "+results);

    // Set custom headers
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products. Please try again later." });
  }
};

// Get product by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("brand").populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Error fetching product details. Please try again later." });
  }
};

// Update product by ID
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product. Please try again later." });
  }
};

// Restore (undelete) product by ID
exports.undeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const restored = await Product.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    ).populate("brand");

    if (!restored) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(restored);
  } catch (error) {
    console.error("Error restoring product:", error);
    res.status(500).json({ message: "Error restoring product. Please try again later." });
  }
};

// Soft delete product by ID
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).populate("brand");

    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product. Please try again later." });
  }
};

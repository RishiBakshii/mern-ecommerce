const request = require('supertest');
const mongoose = require('mongoose');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Product = require('../../models/Product');
const Brand = require('../../models/Brand');

const express = require('express');
const cartRoutes = require('../../routes/Cart');
const app = express();
app.use(express.json());
app.use('/cart', cartRoutes);

describe('Cart Controller', () => {
  let testUser;
  let testProduct;
  let testBrand;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce-test');
    }
  });

  afterAll(async () => {
    await Cart.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Cart.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Brand.deleteMany({});

    // Create test user with unique email for each test run
    const uniqueEmail = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@example.com`;
    testUser = await User.create({
      name: 'Test User',
      email: uniqueEmail,
      password: 'hashedpassword'
    });

    // Create test brand and product
    testBrand = await Brand.create({ name: 'Test Brand' });
    testProduct = await Product.create({
      title: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      brand: testBrand._id,
      category: new mongoose.Types.ObjectId(),
      stockQuantity: 100,
      thumbnail: 'thumbnail.jpg',
      images: ['image1.jpg']
    });
  });

  describe('POST /cart', () => {
    test('should add item to cart', async () => {
      const cartItem = {
        user: testUser._id,
        product: testProduct._id,
        quantity: 2
      };

      const response = await request(app)
        .post('/cart')
        .send(cartItem)
        .expect(201);

      expect(response.body.user.toString()).toBe(testUser._id.toString());
      expect(response.body.product.toString()).toBe(testProduct._id.toString());
      expect(response.body.quantity).toBe(2);
    });

    test('should return 500 on invalid data', async () => {
      const invalidItem = { user: testUser._id }; // Missing product
      const response = await request(app)
        .post('/cart')
        .send(invalidItem)
        .expect(500);

      expect(response.body.message).toContain('Error adding product to cart');
    });
  });

  describe('GET /cart/user/:id', () => {
    beforeEach(async () => {
      await Cart.create({
        user: testUser._id,
        product: testProduct._id,
        quantity: 1
      });
    });

    test('should get cart items by user id', async () => {
      const response = await request(app)
        .get(`/cart/user/${testUser._id}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].user.toString()).toBe(testUser._id.toString());
    });
  });

  describe('PATCH /cart/:id', () => {
    let cartItem;

    beforeEach(async () => {
      cartItem = await Cart.create({
        user: testUser._id,
        product: testProduct._id,
        quantity: 1
      });
    });

    test('should update cart item', async () => {
      const updates = { quantity: 5 };
      const response = await request(app)
        .patch(`/cart/${cartItem._id}`)
        .send(updates)
        .expect(200);

      expect(response.body.quantity).toBe(5);
    });
  });

  describe('DELETE /cart/:id', () => {
    let cartItem;

    beforeEach(async () => {
      cartItem = await Cart.create({
        user: testUser._id,
        product: testProduct._id,
        quantity: 1
      });
    });

    test('should delete cart item', async () => {
      await request(app)
        .delete(`/cart/${cartItem._id}`)
        .expect(200);

      const deleted = await Cart.findById(cartItem._id);
      expect(deleted).toBeNull();
    });
  });

  describe('DELETE /cart/user/:id', () => {
    beforeEach(async () => {
      await Cart.create([
        { user: testUser._id, product: testProduct._id, quantity: 1 },
        { user: testUser._id, product: testProduct._id, quantity: 2 }
      ]);
    });

    test('should delete all cart items for user', async () => {
      await request(app)
        .delete(`/cart/user/${testUser._id}`)
        .expect(204);

      const items = await Cart.find({ user: testUser._id });
      expect(items.length).toBe(0);
    });
  });
});


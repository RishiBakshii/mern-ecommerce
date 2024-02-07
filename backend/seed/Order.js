const Order = require("../models/Order");
const fs = require("fs");

const orders = [
  {
    _id: "65c2658db53f820728d0745a",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f5994454",
          title: "Samsung Galaxy Book",
          description:
            "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
          price: 1499,
          discountPercentage: 4.15,
          stockQuantity: 50,
          brand: { _id: "65a7e20102e12c44f59943db", name: "Samsung" },
          category: "65a7e24602e12c44f599442d",
          thumbnail: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/7/1.jpg",
            "https://cdn.dummyjson.com/product-images/7/2.jpg",
            "https://cdn.dummyjson.com/product-images/7/3.jpg",
            "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
          ],
          isDeleted: false,
          updatedAt: "2024-02-05T09:34:30.107Z",
        },
        quantity: 1,
        _id: "65c26581b53f820728d07456",
      },
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "main 11th",
        city: "Indrapuram",
        state: "Uttar Pradesh",
        phoneNumber: "9452571272",
        postalCode: "201012",
        country: "India",
        type: "Home",
        __v: 0,
      },
    ],
    status: "Pending",
    paymentMode: "CARD",
    total: 1509.55,
    createdAt: "2024-02-07T10:36:15.151Z",
  },
  {
    _id: "65c265c6b53f820728d0749c",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        _id: "65c265a2b53f820728d07474",
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f599445d",
          title: "Hyaluronic Acid Serum",
          description:
            "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
          price: 19,
          discountPercentage: 13.31,
          stockQuantity: 110,
          brand: {
            _id: "65a7e20102e12c44f59943e6",
            name: "L'Oreal Paris",
          },
          category: "65a7e24602e12c44f599442f",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/16/1.png",
            "https://cdn.dummyjson.com/product-images/16/2.webp",
            "https://cdn.dummyjson.com/product-images/16/3.jpg",
            "https://cdn.dummyjson.com/product-images/16/4.jpg",
            "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
          ],
          isDeleted: false,
        },
        quantity: 2,
      },
      {
        _id: "65c265b9b53f820728d0748f",
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f599445e",
          title: "Tree Oil 30ml",
          description:
            "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
          price: 12,
          discountPercentage: 4.09,
          stockQuantity: 78,
          brand: { _id: "65a7e20102e12c44f59943e7", name: "Hemani Tea" },
          category: "65a7e24602e12c44f599442f",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/17/1.jpg",
            "https://cdn.dummyjson.com/product-images/17/2.jpg",
            "https://cdn.dummyjson.com/product-images/17/3.jpg",
            "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
          ],
          isDeleted: false,
        },
        quantity: 3,
      },
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "main 11th",
        city: "Indrapuram",
        state: "Uttar Pradesh",
        phoneNumber: "9452571272",
        postalCode: "201012",
        country: "India",
        type: "Home",
        __v: 0,
      },
    ],
    status: "Pending",
    paymentMode: "COD",
    total: 84.55,
    createdAt: "2024-02-07T10:36:15.151Z",
  },
  {
    _id: "65c265feb53f820728d074b4",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f59944b0",
          title: "American Vintage Wood Pendant Light",
          description:
            "American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante",
          price: 46,
          discountPercentage: 8.84,
          stockQuantity: 138,
          brand: { _id: "65a7e20102e12c44f5994425", name: "Ifei Home" },
          category: "65a7e24602e12c44f599443f",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/99/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/99/1.jpg",
            "https://cdn.dummyjson.com/product-images/99/2.jpg",
            "https://cdn.dummyjson.com/product-images/99/3.jpg",
            "https://cdn.dummyjson.com/product-images/99/4.jpg",
            "https://cdn.dummyjson.com/product-images/99/thumbnail.jpg",
          ],
          isDeleted: false,
        },
        quantity: 1,
        _id: "65c265edb53f820728d074b0",
      },
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "main 11th",
        city: "Indrapuram",
        state: "Uttar Pradesh",
        phoneNumber: "9452571272",
        postalCode: "201012",
        country: "India",
        type: "Home",
        __v: 0,
      },
    ],
    status: "Pending",
    paymentMode: "COD",
    total: 56.55,
    createdAt: "2024-02-07T10:36:15.151Z",
  },
  {
    _id: "65c2667db53f820728d07579",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        _id: "65c26673b53f820728d0756f",
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f599446d",
          title: "Sofa for Coffe Cafe",
          description:
            "Ratttan Outdoor furniture Set Waterproof  Rattan Sofa for Coffe Cafe",
          price: 50,
          discountPercentage: 15.59,
          stockQuantity: 30,
          brand: {
            _id: "65a7e20102e12c44f59943f6",
            name: "Ratttan Outdoor",
          },
          category: "65a7e24602e12c44f5994432",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/32/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/32/1.jpg",
            "https://cdn.dummyjson.com/product-images/32/2.jpg",
            "https://cdn.dummyjson.com/product-images/32/3.jpg",
            "https://cdn.dummyjson.com/product-images/32/thumbnail.jpg",
          ],
          isDeleted: false,
        },
        quantity: 1,
      },
    ],
    address: [
      {
        _id: "65c26412e1e1a2106ac8fbd8",
        user: "65b8e564ea5ce114184ccb96",
        street: "main 18th",
        city: "Noida",
        state: "Uttar Pradesh",
        phoneNumber: "9846286159",
        postalCode: "301273",
        country: "India",
        type: "Buisness",
        __v: 0,
      },
    ],
    status: "Pending",
    paymentMode: "CARD",
    total: 60.55,
    createdAt: "2024-02-07T10:36:15.151Z",
  },
  {
    _id: "65c266eab53f820728d0763f",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        _id: "65c266dab53f820728d07632",
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e45902e12c44f59944ae",
          title: "Metal Ceramic Flower",
          description:
            "Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp",
          price: 35,
          discountPercentage: 10.94,
          stockQuantity: 146,
          brand: { _id: "65a7e20102e12c44f5994425", name: "Ifei Home" },
          category: "65a7e24602e12c44f599443f",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/97/thumbnail.jpg",
          images: [
            "https://cdn.dummyjson.com/product-images/97/1.jpg",
            "https://cdn.dummyjson.com/product-images/97/2.jpg",
            "https://cdn.dummyjson.com/product-images/97/3.jpg",
            "https://cdn.dummyjson.com/product-images/97/4.webp",
            "https://cdn.dummyjson.com/product-images/97/thumbnail.jpg",
          ],
          isDeleted: false,
        },
        quantity: 4,
      },
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "main 11th",
        city: "Indrapuram",
        state: "Uttar Pradesh",
        phoneNumber: "9452571272",
        postalCode: "201012",
        country: "India",
        type: "Home",
        __v: 0,
      },
    ],
    status: "Pending",
    paymentMode: "COD",
    total: 150.55,
    createdAt: "2024-02-07T10:36:15.151Z",
  },
];

exports.seedOrder = async () => {
  try {
    await Order.insertMany(orders);
    console.log("Order seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

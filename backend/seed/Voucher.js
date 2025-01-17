const Voucher = require("../models/Voucher");

const voucherItem = [
  {
    _id: "678a5358ad431e8bafad586d",
    user: "65b8e564ea5ce114184ccb96",
    code: "ABC1234",
    value: 10000,
    createdAt: "2025-01-07T10:11:46.794Z",
    redeemedAt: "2025-01-07T10:11:46.794Z",
    note: "Thank you for your service at RIB",
  },

  {
    _id: "678a5358ad431e8bafad586e",
    user: "65b8e564ea5ce114184ccb96",
    code: "ABC1235",
    value: 20000,
    createdAt: "2025-01-08T10:11:46.794Z",
    redeemedAt: "2025-01-08T10:11:46.794Z",
    note: "Thank you for your service",
  },
  {
    _id: "678a52fd6a67a9264035591d",
    user: "65b8e564ea5ce114184ccb96",
    code: "ABC1236",
    value: 5000,
    createdAt: "2025-01-08T10:11:46.794Z",
    redeemedAt: "2025-01-08T10:11:46.794Z",
    note: "Thank you for your service!!!!!!",
  },
  
];

exports.seedVoucher = async () => {
  try {
    await Voucher.insertMany(voucherItem);
    console.log("Voucher seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

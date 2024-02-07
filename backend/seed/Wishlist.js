const Wishlist = require("../models/Wishlist");

const wishlistItem = [
  {
    _id: "65c2441232078478e340ab60",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444e",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Can't. Stop. Thinking. About. This. Phone.  All the new features are giving me major FOMO. Next paycheck, consider yourself spent! **",
  },
  {
    _id: "65c2441332078478e340ab64",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444f",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "My signature scent just got an upgrade! This perfume is the perfect addition to my collection. Next paycheck, we meet again!",
  },
  {
    _id: "65c2441532078478e340ab68",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994450",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Goodbye, clunky laptop! This lightweight tablet would be my new travel buddy for working remotely, catching up on emails, and staying connected. ✈️",
  },
  {
    _id: "65c2441732078478e340ab6c",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994456",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Gaming beast unlocked! This laptop with its latest features like dedicated graphics card, fast refresh rate, powerful cooling system] would be the ultimate gaming machine. Time to conquer those virtual worlds! ⚔️",
  },
  {
    _id: "65c2441a32078478e340ab70",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994452",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Have to buy this for my friend's birthday",
  },
  {
    _id: "65c2442132078478e340ab7a",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944b0",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Mood magic! These smart lights would transform my living room into the perfect movie night haven with customisable colours and dimming. Goodbye, harsh overhead lights! ✨",
  },
  {
    _id: "65c2443632078478e340ab9a",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994474",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A perfect christmas gift for my wife",
  },
  {
    _id: "65c2444732078478e340aba4",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994481",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A perfect gift for my relative's kid",
  },
  {
    _id: "65c2445332078478e340abab",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599448a",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A nice decent watch like this would be a perfect match with my outfit this saturday night",
  },
  {
    _id: "65c2447032078478e340abd4",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a2",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Have to buy this for upcoming beach party",
  },
];

exports.seedWishlist = async () => {
  try {
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

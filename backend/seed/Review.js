const Review = require("../models/Review");

const reviews = [
  {
    _id: "65c252e3dcd9253acfbaa76c",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599444e",
    rating: 5,
    comment:
      "Exceeded expectations! This phone is a game-changer. Lightning fast, stunning camera, incredible battery life. Best phone ever! ",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25339dcd9253acfbaa79e",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994451",
    rating: 3,
    comment:
      "Good, not mind-blowing. Decent phone, not revolutionary. Average camera, battery life, performance.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2535fdcd9253acfbaa7c9",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994450",
    rating: 2,
    comment:
      "Short battery life. Needs more frequent charging than advertised, especially with heavy usage.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25380dcd9253acfbaa7df",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994452",
    rating: 5,
    comment:
      "Multitasking master! Seamlessly handles all open apps and tasks. So happy with the performance!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c253ebdcd9253acfbaa7f5",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994453",
    rating: 5,
    comment:
      "Powerhouse performer! This laptop screams speed! Handles demanding tasks like video editing and gaming with ease. Blazing fast processor, smooth multitasking, never a lag in sight. Highly recommend for power users!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25416dcd9253acfbaa80b",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994454",
    rating: 3,
    comment:
      "Almost perfect, except... Love the sleek design, comfortable keyboard, and powerful performance. However, the lack of touch screen functionality is a slight letdown.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2542cdcd9253acfbaa821",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994455",
    rating: 5,
    comment:
      "Travel buddy goals! Lightweight, slim design, and long battery life make this laptop the perfect travel companion. Explores the world with me without weighing me down. Bonus points for the spill-resistant keyboard (coffee accidents happen!)",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25443dcd9253acfbaa837",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994456",
    rating: 5,
    comment:
      "Content creator's dream! Stunning visuals, vibrant colors, and exceptional color accuracy - the display is a masterpiece! Perfect for photo editing, graphic design, and even casual content creation.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25473dcd9253acfbaa84d",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994457",
    rating: 3,
    comment:
      "Solid performer, but lacks pizzazz. Reliable and gets the job done, but the design feels a bit outdated and the display could be brighter. Good option for basic tasks at a reasonable price.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c254a8dcd9253acfbaa863",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599444f",
    rating: 5,
    comment:
      "Intoxicatingly elegant! This perfume is like a warm embrace on a cool night. Sophisticated and timeless, it leaves a trail of compliments wherever I go. Perfect for special occasions or everyday luxury. ✨",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c254d1dcd9253acfbaa891",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994458",
    rating: 5,
    comment:
      "Confidence booster! This bold and citrusy fragrance is perfect for making a statement. The invigorating blend of grapefruit, bergamot, and vetiver is energizing and leaves me feeling empowered.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c254f2dcd9253acfbaa89e",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994459",
    rating: 3,
    comment:
      "Pricey for the performance. While the scent is nice, the price tag might be a bit high compared to other similar fragrances in the market.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2551bdcd9253acfbaa8ab",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445a",
    rating: 5,
    comment:
      "Unique and captivating! This perfume is unlike anything I've ever smelled before. The blend of exotic florals and earthy musk creates a mysterious and alluring aroma. Perfect for those who want to stand out from the crowd.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25533dcd9253acfbaa8b8",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445b",
    rating: 2,
    comment:
      "Artificial and chemical smell. This fragrance smells synthetic and unpleasant. Lacks the natural and fresh aroma I was hoping for.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25550dcd9253acfbaa8c5",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445c",
    rating: 5,
    comment:
      "Enchanting aroma! This fragrance is like a walk through a blooming garden. Fresh, floral notes with a hint of sweetness that lingers beautifully. Perfect for daytime wear and leaves a lasting impression.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c255abdcd9253acfbaa908",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445f",
    rating: 5,
    comment:
      "Holy Grail Glow! This moisturizer transformed my dull skin! Deeply hydrates without feeling greasy, and the added vitamin C brightens my complexion beautifully. My skin feels plump, dewy, and radiant all day long.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c255cadcd9253acfbaa916",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994461",
    rating: 2,
    comment:
      "Breakouts galore! This product did the opposite of its intended purpose and clogged my pores, leading to breakouts. Avoid if you have acne-prone skin.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c255e9dcd9253acfbaa924",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994460",
    rating: 3,
    comment:
      "Feels good, long-term results unclear. This mask feels refreshing and calming on the skin, but the long-term anti-aging benefits are not yet noticeable. Requires consistent use to see if it delivers on its promises.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c255fcdcd9253acfbaa932",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445e",
    rating: 3,
    comment:
      "Patch test recommended! This product contains potent ingredients that might cause irritation for some skin types. Patch test before applying all over your face to avoid any reactions.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25676dcd9253acfbaa940",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f599445d",
    rating: 5,
    comment:
      "Kiss Dryness Goodbye! This hydrating serum is a game-changer for my dry skin. Locks in moisture all day long, leaving my skin feeling soft, comfortable, and plump. No more flaky patches or tight feeling!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25703dcd9253acfbaa970",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444e",
    rating: 5,
    comment:
      "Great customer service! Quick and helpful in resolving a minor issue. Plus points for that!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25735dcd9253acfbaa988",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994450",
    rating: 3,
    comment:
      "Slow software updates. Great phone, but software updates seem slow. Hopefully, this improves.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25758dcd9253acfbaa9a0",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994451",
    rating: 5,
    comment:
      "Camera king! Stunning photos and videos, even for non-professionals. Portrait mode is especially impressive!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25787dcd9253acfbaa9b8",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994452",
    rating: 2,
    comment:
      "Bloatware overload! Unnecessary pre-installed apps I can't remove. Annoying!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c257c1dcd9253acfbaa9d0",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994453",
    rating: 3,
    comment:
      "Upgradable potential! This laptop offers solid performance and a decent price point. However, some components are not user-upgradeable, limiting future customization.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25805dcd9253acfbaa9e8",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994454",
    rating: 2,
    comment:
      "Overheating issues. Prone to overheating during demanding tasks, making it uncomfortable to use for extended periods.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2583adcd9253acfbaaa06",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994455",
    rating: 2,
    comment:
      "Stiff keyboard, ouch! Typing for long periods becomes painful on the uncomfortable keyboard. Consider an external keyboard for frequent use.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25950dcd9253acfbaaa88",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994456",
    rating: 3,
    comment:
      "Gamer on a budget? Handles casual games well, but struggles with more demanding titles. Great battery life, portable design, but not ideal for hardcore gamers.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2596edcd9253acfbaaaa0",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994457",
    rating: 3,
    comment:
      "Gorgeous display, but... The stunning display comes at the cost of battery life. Frequent charging needed, especially for heavy users.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c259a0dcd9253acfbaaab8",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444f",
    rating: 2,
    comment:
      "Headache in a bottle! The strong floral notes in this fragrance are too much for me. Gave me a headache after just a few minutes of wear.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c259b0dcd9253acfbaaad0",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994458",
    rating: 2,
    comment:
      "Not as described. The online description and reviews painted a different picture. The actual scent is quite different and not what I expected.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c259cadcd9253acfbaaae8",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994459",
    rating: 5,
    comment:
      "Long-lasting love! This fragrance stays true to its scent all day long. No need for constant reapplication. The subtle notes unfold throughout the day, keeping the scent fresh and interesting.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c259e4dcd9253acfbaab00",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599445b",
    rating: 5,
    comment:
      "Unique and captivating! This perfume is unlike anything I've ever smelled before. The blend of exotic florals and earthy musk creates a mysterious and alluring aroma. Perfect for those who want to stand out from the crowd.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c259fadcd9253acfbaab18",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599445c",
    rating: 1,
    comment:
      "Too sweet, feels cloying. This perfume is way too sugary and sweet for my taste. The scent gets overpowering quickly and becomes unpleasant.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25af9dcd9253acfbaab43",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a1",
    rating: 1,
    comment:
      " Festival Fashionista! These holographic sunnies with their playful design turn heads and make a statement wherever I go. Perfect for adding a touch of festival flair to any outfit. ✨",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25b50dcd9253acfbaab77",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a0",
    rating: 3,
    comment:
      "Statement Shades, Bold Choice. These neon cat-eye sunnies are definitely eye-catching, but the bold design might not suit all styles and occasions. Be confident in your statement if you choose these!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25b9bdcd9253acfbaab8d",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a2",
    rating: 3,
    comment:
      "Not As Dark As Expected. The tint on these sunglasses isn't as dark as advertised, offering less sun protection than anticipated. Choose lenses with a darker tint for strong sunlight conditions.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
];

exports.seedReview = async () => {
  try {
    await Review.insertMany(reviews);
    console.log("Review seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

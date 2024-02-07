const {seedBrand}=require("./Brand")
const {seedCategory}=require("./Category")
const {seedProduct}=require("./Product")
const {seedUser}=require("./User")
const {seedAddress}=require("./Address")
const {seedWishlist}=require("./Wishlist")
const {seedCart}=require("./Cart")
const {seedReview}=require("./Review")
const {seedOrder}=require("./Order")
const {connectToDB}=require("../database/db")

const seedData=async()=>{
    try {
        await connectToDB()
        console.log('Seed [started] please wait..');
        await seedBrand()
        await seedCategory()
        await seedProduct()
        await seedUser()
        await seedAddress()
        await seedWishlist()
        await seedCart()
        await seedReview()
        await seedOrder()

        console.log('Seed completed..');
    } catch (error) {
        console.log(error);
    }
}

seedData()
const express=require("express")
const wishlistController=require("../controllers/Wishlist")
const router=express.Router()


router
    .post("/",wishlistController.create)
    .get("/user/:id",wishlistController.getByUserId)
    .patch("/:id",wishlistController.updateById)
    .delete("/:id",wishlistController.deleteById)

module.exports=router
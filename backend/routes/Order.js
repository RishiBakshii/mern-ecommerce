const express=require('express')
const orderController=require("../controllers/Order")
const router=express.Router()


router
    .post("/",orderController.create)
    .get("/user/:id",orderController.getByUserId)


module.exports=router
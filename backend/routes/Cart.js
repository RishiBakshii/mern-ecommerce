const express=require('express')
const cartController=require('../controllers/Cart')
const router=express.Router()

router
    .post("/",cartController.create)
    .get("/user/:id",cartController.getByUserId)
    .patch("/:id",cartController.updateById)

module.exports=router
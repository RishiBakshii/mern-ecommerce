const express=require('express')
const cartController=require('../controllers/Cart')
const router=express.Router()

router
    .post("/",cartController.create)
    .patch("/:id",cartController.updateById)

module.exports=router
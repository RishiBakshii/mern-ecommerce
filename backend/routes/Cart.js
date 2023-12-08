const express=require('express')
const cartController=require('../controllers/Cart')
const router=express.Router()

router
    .post("/",cartController.create)

module.exports=router
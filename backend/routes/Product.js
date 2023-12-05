const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()

router
    .post("/",productController.create)

module.exports=router
const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()

router
    .post("/",productController.create)
    .get("/",productController.getAll)

module.exports=router
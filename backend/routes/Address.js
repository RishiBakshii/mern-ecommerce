const express=require('express')
const addressController=require("../controllers/Address")
const router=express.Router()

router
    .post("/",addressController.create)
    .get("/user/:id",addressController.getByUserId)
    .patch('/:id',addressController.updateById)
    .delete('/:id',addressController.deleteById)

module.exports=router
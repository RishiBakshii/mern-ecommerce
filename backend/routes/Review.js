const express=require('express')
const reviewController=require("../controllers/Review")
const router=express.Router()


router
    .post("/",reviewController.create)
    .get('/product/:id',reviewController.getByProductId)
    .patch('/:id',reviewController.updateById)
    .delete("/:id",reviewController.deleteById)

module.exports=router
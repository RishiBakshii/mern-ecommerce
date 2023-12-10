const express=require("express")
const userController=require("../controllers/User")
const router=express.Router()

router
    .get("/:id",userController.getById)
    .patch("/:id",userController.updateById)

module.exports=router
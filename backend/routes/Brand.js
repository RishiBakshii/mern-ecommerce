const express=require("express")
const brandController=require("../controllers/Brand")
const router=express.Router()

router
    .get("/",brandController.getAll)

module.exports=router
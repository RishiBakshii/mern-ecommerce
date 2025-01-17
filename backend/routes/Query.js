const express=require('express')
const queryController=require("../controllers/Query")
const router=express.Router()

router
    .post("/contact",queryController.create)
    .get("/contact",queryController.getAll)
    // .get("/:id",productController.getById)
    // .patch("/:id",productController.updateById)
    // .patch("/undelete/:id",productController.undeleteById)
    // .delete("/:id",productController.deleteById)

module.exports=router
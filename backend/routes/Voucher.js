const express=require("express")
const voucherController=require("../controllers/Voucher")
const router=express.Router()


router
    .post("/",voucherController.create)
    .get("/user/:id",voucherController.getByUserId)
    .patch("/:id",voucherController.updateById)
    .delete("/:id",voucherController.deleteById)

module.exports=router
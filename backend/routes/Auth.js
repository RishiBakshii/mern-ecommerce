const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")

router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .post("/verify-otp",authController.verifyOtp)
    .post("/forgot-password",authController.forgotPassword)


module.exports=router
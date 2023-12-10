const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require('../middleware/VerifyToken')

router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .post("/verify-otp",authController.verifyOtp)
    .post("/forgot-password",authController.forgotPassword)
    .post("/reset-password",authController.resetPassword)
    .get("/check-auth",verifyToken,authController.checkAuth)
    .get('/logout',authController.logout)


module.exports=router
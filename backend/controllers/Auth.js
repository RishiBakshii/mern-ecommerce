const User = require("../models/User");
const bcrypt=require('bcryptjs');
const { sendMail } = require("../utils/Emails");
const { generateOTP } = require("../utils/GenerateOtp");
const Otp = require("../models/OTP");
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");
const PasswordResetToken = require("../models/PasswordResetToken");

exports.signup=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})
        
        // if user already exists
        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }

        // hashing the password
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body.password=hashedPassword

        // creating new user
        const createdUser=new User(req.body)
        await createdUser.save()

        // getting secure user info
        const secureInfo=sanitizeUser(createdUser)

        // generating jwt token
        const token=generateToken(secureInfo)

        // sending jwt token in the response cookies
        res.cookie('token',token,{
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })

        res.status(201).json(sanitizeUser(createdUser))

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured during signup, please try again later"})
    }
}

exports.login=async(req,res)=>{
    try {
        // checking if user exists or not
        const existingUser=await User.findOne({email:req.body.email})

        // if exists and password matches the hash
        if(existingUser && (await bcrypt.compare(req.body.password,existingUser.password))){

            // getting secure user info
            const secureInfo=sanitizeUser(existingUser)

            // generating jwt token
            const token=generateToken(secureInfo)

            // sending jwt token in the response cookies
            res.cookie('token',token,{
                sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true,
                secure:process.env.PRODUCTION==='true'?true:false
            })
            return res.status(200).json(sanitizeUser(existingUser))
        }

        res.clearCookie('token');
        return res.status(404).json({message:"Invalid Credentails"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Some error occured while logging in, please try again later'})
    }
}

exports.verifyOtp=async(req,res)=>{
    try {
        // checks if user id is existing in the user collection
        const isValidUserId=await User.findById(req.body.userId)

        // if user id does not exists then returns a 404 response
        if(!isValidUserId){
            return res.status(404).json({message:'User not Found, for which the otp has been generated'})
        }

        // checks if otp exists by that user id
        const isOtpExisting=await Otp.findOne({user:isValidUserId._id})

        // if otp does not exists then returns a 404 response
        if(!isOtpExisting){
            return res.status(404).json({message:'Otp not found'})
        }

        // checks if the otp is expired, if yes then deletes the otp and returns response accordinly
        if(isOtpExisting.expiresAt < new Date()){
            await Otp.findByIdAndDelete(isOtpExisting._id)
            return res.status(400).json({message:"Otp has been expired"})
        }
        
        // checks if otp is there and matches the hash value then updates the user verified status to true and returns the updated user
        if(isOtpExisting && (await bcrypt.compare(req.body.otp,isOtpExisting.otp))){
            await Otp.findByIdAndDelete(isOtpExisting._id)
            const verifiedUser=await User.findByIdAndUpdate(isValidUserId._id,{isVerified:true},{new:true})
            return res.status(200).json(sanitizeUser(verifiedUser))
        }

        // in default case if none of the conidtion matches, then return this response
        return res.status(400).json({message:'Otp is invalid or expired'})


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some Error occured"})
    }
}

exports.resendOtp=async(req,res)=>{
    try {

        const existingUser=await User.findById(req.body.user)

        if(!existingUser){
            return res.status(404).json({"message":"User not found"})
        }

        await Otp.deleteMany({user:existingUser._id})

        const otp=generateOTP()
        const hashedOtp=await bcrypt.hash(otp,10)

        const newOtp=new Otp({user:req.body.user,otp:hashedOtp,expiresAt:Date.now()+parseInt(process.env.OTP_EXPIRATION_TIME)})
        await newOtp.save()

        await sendMail(existingUser.email,`OTP Verification for Your MERN-AUTH-REDUX-TOOLKIT Account`,`Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`)

        res.status(201).json({'message':"OTP sent"})
    } catch (error) {
        res.status(500).json({'message':"Some error occured while resending otp, please try again later"})
        console.log(error);
    }
}

exports.forgotPassword=async(req,res)=>{
    let newToken;
    try {
        // checks if user provided email exists or not
        const isExistingUser=await User.findOne({email:req.body.email})

        // if email does not exists returns a 404 response
        if(!isExistingUser){
            return res.status(404).json({message:"Provided email does not exists"})
        }

        await PasswordResetToken.deleteMany({user:isExistingUser._id})

        // if user exists , generates a password reset token
        const passwordResetToken=generateToken(sanitizeUser(isExistingUser),true)

        // hashes the token
        const hashedToken=await bcrypt.hash(passwordResetToken,10)

        // saves hashed token in passwordResetToken collection
        newToken=new PasswordResetToken({user:isExistingUser._id,token:hashedToken,expiresAt:Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME)})
        await newToken.save()

        // sends the password reset link to the user's mail
        await sendMail(isExistingUser.email,'Password Reset Link for Your MERN-AUTH-REDUX-TOOLKIT Account',`<p>Dear ${isExistingUser.name},

        We received a request to reset the password for your MERN-AUTH-REDUX-TOOLKIT account. If you initiated this request, please use the following link to reset your password:</p>
        
        <p><a href=${process.env.ORIGIN}/reset-password/${isExistingUser._id}/${passwordResetToken} target="_blank">Reset Password</a></p>
        
        <p>This link is valid for a limited time. If you did not request a password reset, please ignore this email. Your account security is important to us.
        
        Thank you,
        The MERN-AUTH-REDUX-TOOLKIT Team</p>`)

        res.status(200).json({message:`Password Reset link sent to ${isExistingUser.email}`})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error occured while sending password reset mail'})
    }
}

exports.resetPassword=async(req,res)=>{
    try {

        // checks if user exists or not
        const isExistingUser=await User.findById(req.body.userId)

        // if user does not exists then returns a 404 response
        if(!isExistingUser){
            return res.status(404).json({message:"User does not exists"})
        }

        // fetches the resetPassword token by the userId
        const isResetTokenExisting=await PasswordResetToken.findOne({user:isExistingUser._id})

        // If token does not exists for that userid, then returns a 404 response
        if(!isResetTokenExisting){
            return res.status(404).json({message:"Reset Link is Not Valid"})
        }

        // if the token has expired then deletes the token, and send response accordingly
        if(isResetTokenExisting.expiresAt < new Date()){
            await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id)
            return res.status(404).json({message:"Reset Link has been expired"})
        }

        // if token exists and is not expired and token matches the hash, then resets the user password and deletes the token
        if(isResetTokenExisting && isResetTokenExisting.expiresAt>new Date() && (await bcrypt.compare(req.body.token,isResetTokenExisting.token))){

            // deleting the password reset token
            await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id)

            // resets the password after hashing it
            await User.findByIdAndUpdate(isExistingUser._id,{password:await bcrypt.hash(req.body.password,10)})
            return res.status(200).json({message:"Password Updated Successfuly"})
        }

        return res.status(404).json({message:"Reset Link has been expired"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured while resetting the password, please try again later"})
    }
}

exports.logout=async(req,res)=>{
    try {
        res.cookie('token',{
            maxAge:0,
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })
        res.status(200).json({message:'Logout successful'})
    } catch (error) {
        console.log(error);
    }
}

exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            const user=await User.findById(req.user._id)
            return res.status(200).json(sanitizeUser(user))
        }
        res.sendStatus(401)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
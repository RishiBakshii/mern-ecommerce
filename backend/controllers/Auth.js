const User = require("../models/User");
const bcrypt=require('bcryptjs');
const { sendMail } = require("../utils/Emails");
const { generateOTP } = require("../utils/GenerateOtp");
const Otp = require("../models/Otp");
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");

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

        // generating otp
        const otp=generateOTP()

        // storing the otp in hashed format
        const hashedOtp=await bcrypt.hash(otp,10)
        const newOtp=new Otp({user:createdUser._id,otp:hashedOtp,expiresAt:Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME)})
        await newOtp.save()

        // sending otp on email for verification
        await sendMail(createdUser.email,`OTP Verification for Your MERN-AUTH-REDUX-TOOLKIT Account`,`Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`)

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
                sameSite:'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true
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
const User = require("../models/User");
const bcrypt=require('bcryptjs');
const { sendMail } = require("../utils/Emails");
const { generateOTP } = require("../utils/GenerateOtp");
const Otp = require("../models/Otp");
const { sanitizeUser } = require("../utils/SanitizeUser");

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
        res.status(500).json({'message':"Error occured during signup, please try again later"})
    }
}
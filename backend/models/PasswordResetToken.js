const mongoose=require("mongoose")
const {Schema}=mongoose

const passwordResetTokenSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
})



module.exports=mongoose.model("PasswordResetToken",passwordResetTokenSchema)
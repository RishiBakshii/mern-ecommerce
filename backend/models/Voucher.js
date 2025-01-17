const mongoose=require('mongoose')
const {Schema}=mongoose

const voucherSchema=new Schema({
    code:{
        type:String,
        require:true
    },
    value:{
        type:Number,
        ref:"Product",
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        require:true
    },
    redeemedAt:{
        type:Date
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    note:{
        type:String,
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Voucher",voucherSchema)
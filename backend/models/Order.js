const mongoose=require("mongoose")
const { itemSchema } = require("./Item")
const {Schema}=mongoose

const orderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    item:{
        type:String,
        required:true
    },
    address:{
        type:[itemSchema],
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Dispatched','Out for delivery','Cancelled'],
        default:'Pending'
    },
    paymentMode:{
        type:String,
        enum:['Cash on Delivery','UPI','CARD'],
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{versionKey:false})

module.exports=mongoose.model("Order",orderSchema)
const mongoose=require("mongoose")
const {Schema}=mongoose

export const itemSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
})

const cartSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:{
        type:[itemSchema],
        required:true
    }
},{versionKey:false})

module.exports=mongoose.model("Cart",cartSchema)
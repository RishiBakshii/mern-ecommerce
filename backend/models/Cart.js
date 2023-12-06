const mongoose=require("mongoose")
const { itemSchema } = require("./Item")
const {Schema}=mongoose

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
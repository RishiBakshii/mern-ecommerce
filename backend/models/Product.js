const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)
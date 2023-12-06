const mongoose=require('mongoose')
const {Schema}=mongoose

exports.itemSchema=new Schema({
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
const mongoose=require("mongoose")
const {Schema}=mongoose

const querySchema= new Schema({
    description:{
        type:String,
        required:true
    },
    isAddressed:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Query',querySchema)
const Review=require("../models/Review")

exports.create=async(req,res)=>{
    try {
        console.log(req.body);
        const created=await new Review(req.body).populate({path:'user',select:"-password"})
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error posting review, please trying again later'})
    }
}

exports.getByProductId=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Review.find({product:id}).populate('user')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting reviews for this product, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Review.findByIdAndUpdate(id,req.body,{new:true}).populate('user')
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating review, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Review.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting review, please try again later'})
    }
}
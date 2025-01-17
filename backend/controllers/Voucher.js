const Voucher = require("../models/Voucher")

exports.create=async(req,res)=>{
    try {
        const created=await new Voucher(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error adding voucher, please try again later"})
    }
}
exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        let skip=0
        let limit=0

        if(req.query.page && req.query.limit){
            const pageSize=req.query.limit
            const page=req.query.page

            skip=pageSize*(page-1)
            limit=pageSize
        }

        const result=await Voucher.find({user:id}).skip(skip).limit(limit)
        const totalResults=await Voucher.find({user:id}).countDocuments().exec()

        res.set("X-Total-Count",totalResults)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching your vouchers, please try again later"})
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Voucher.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating voucher, please try again later"})
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Voucher.findByIdAndDelete(id)
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting that voucher, please try again later"})
    }
}
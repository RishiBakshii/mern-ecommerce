const Cart=require('../models/Cart')

exports.create=async(req,res)=>{
    try {
        const created=new Cart(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product to cart, please trying again later'})
    }
}
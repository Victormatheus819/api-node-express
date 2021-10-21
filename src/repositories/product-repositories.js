'use strict'
const mongoose = require("mongoose")
const Product = mongoose.model("Product");

exports.get =async()=>{
    const res= await Product.find({active:true},"title price slug");
     return res
}

exports.getBySlug =async(req)=>{
    const res= await Product.findOne({slug:req.params.slug},"title description price slug tags")
    return res
}

exports.getById =async(req)=>{
    const res= await Product.findById(req.params.id)
    return res
} 

exports.getByTag =async(req)=>{
    const res= await Product.find({tags:req.params.tag},
        "title description price slug tags")
        return res
}

exports.create = async(data)=>{
    var product=  new Product(data);
   await  product.save()

   
}

exports.update = async(id,data)=>{
   return await Product.findByIdAndUpdate(id,{
        $set:{
            title:data.title,
            description: data.description,
            price:data.price
        }
    })
}

exports.delete=(req,res,next)=>{
    return Product.findByIdAndDelete(req.body.id
    )
}

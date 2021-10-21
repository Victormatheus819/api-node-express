'use strict'
const mongoose = require("mongoose")
const Order = mongoose.model("Order");

exports.get =async()=>{
    const res= await Order.find({},"number status")
    .populate('customer','name')
    .populate('items.product');
     return res
}

exports.create = async(data)=>{
    var product=  new Order(data);
   await  product.save()

   
}
'use strict'
const mongoose = require("mongoose")
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator")
const repository = require("../repositories/product-repositories")
exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
exports.getBySlug = async(req,res,next)=>{
    try{
        const data=await repository.getBySlug(req)
        res.status(201).send(data);
        }catch(e){
        res.status(400).send(e);
       }
}

exports.getById =async(req,res,next)=>{
    try{
        const data=await repository.getById(req)
        res.status(201).send(data);
        }catch(e){
        res.status(400).send(e);
       }
}
exports.getByTag =async(req,res,next)=>{
    try{
        const data=await repository.getByTag(req)
        res.status(201).send(data);
        }catch(e){
        res.status(400).send(e);
       }
}
exports.post= async(req,res,next)=>{
    let contract =  new ValidationContract();
    contract.hasMinLen(req.body.title,3, 'O titulo deve conter pelo menos três caracteres ')
    contract.hasMinLen(req.body.slug ,5, 'O slug deve conter pelo menos três caracteres ')
    contract.hasMinLen(req.body.description,5, 'A descrição deve conter pelo menos três caracteres ')
    var product=  new Product(req.body);
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }
    try{
    await repository.create(product)
    res.status(201).send({message : "produto cadastrado"});
    }catch(e){
    res.status(400).send(e);
   }
   
};

exports.put=async(req,res)=>{
      try{
      await repository.update(req.id,req.body)
         res.status(201).send({
          message: 'Produto atualizado com sucesso'
         })
         }catch(e){
        res.status(400).send({message : "Falha ao atualizar o produto",data:e});

         }
};

exports.delete=(req,res,next)=>{
   repository.delete(req.body.id
    ).then(x=>{
        res.status(201).send({
         message: 'Produto removido com sucesso'
        })
    }).catch(e=>{
       res.status(400).send({message : "Falha ao remover o produto",data:e});

        })
};

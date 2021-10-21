'use strict'

const ValidationContract = require("../validators/fluent-validator")
const repository = require("../repositories/customer-repositories")
const md5 = require('md5');
const emailService = require("../services/email_service")
const authService = require("../services/auth-service")

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles : req.body.roles
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
             global.EMAIL_TEMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};

exports.authenticate = async(req, res, next) => {
    

    try {
       const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
        });


        if(!customer){
            res.status(404).send({
                message: 'Usuarios ou senha invalidos'
            })
        }
       const token = await authService.generateToken({ 
            email: customer.email,
            name : customer.name,
            roles : customer.roles
        })
        console.log(token)
        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
             global.EMAIL_TEMPL.replace('{0}', req.body.name));
        
        res.status(201).send({
           token:token ,
           data: { 
               email: customer.email,
               name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};
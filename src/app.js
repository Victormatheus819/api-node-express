
const mongoose = require("mongoose")
const express = require("express")
var config = require('../config')
const app =  express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//Conexão com o banco
mongoose.connect(config.connectionString)

//Carrega os modelos
const Customer = require('./models/customer');
const Product = require('./models/products');
const oOrder = require('./models/order');

//Carregar rotas
const index = require ('./routes/index')
const products = require ('./routes/products')
const  customer = require("./routes/customer")
const  order = require("./routes/order")

app.use( '/',index)
app.use('/products',products)
app.use('/customer',customer)
app.use('/order',order)

module.exports= app

const express= require("express");
const router= express.Router();
const  controller = require( '../controllers/OrderController')

router.post("/",controller.post);
router.get("/",controller.get);

module.exports=router
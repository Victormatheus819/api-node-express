const express= require("express");
const app =  express()
const router= express.Router();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

router.get("/",(req,res,next)=>{
    res.status(200).send({
        title:"Node STore Api",
        version:"0.0.1"
    });
});

module.exports = router;
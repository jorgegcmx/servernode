var express = require("express");
var router=express.Router();

router.get('/Error',(req,res)=>{
res.send('lola');
})
module.exports =router;




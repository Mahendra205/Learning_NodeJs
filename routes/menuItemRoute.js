const express=require('express');
const router=express.Router();
const menuItem=require('../models/menuItem');

router.post('/',async(req,res)=>{
    try{
      const data=req.body;
      const newItem=new menuItem(data);
      const respons=await newItem.save();
      console.log("data saved ");
      res.json(respons);
    }catch(err){
      console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
  
router.get('/',async(req,res)=>{
  try{
    const data=await menuItem.find();
    res.json(data);
  
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

module.exports=router;
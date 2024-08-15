const express=require('express');
const router=express.Router();
const person=require('../models/person');


router.post('/',async(req,res)=>{
    try{
     const data=req.body//assuming the request body contain the person data
     //create a new person document using mpngodb model
 
     const newPerson=new person(data);
 
     //save the new person to the database
     const respons=await newPerson.save();
     console.log('data saved');
     res.status(200).json(respons);
    }catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }
})


router.get('/',async(req,res)=>{
    try{
      const data=await person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
})


router.get('/:workType',async(req,res)=>{
    try{
      const workType=req.params.workType;
      if(workType=='manager'|| workType=='chef'|| workType=='waiter'||workType=='owner'){
        const response=await person.find({work:workType});
        console.log("data fetched");
        res.json(response);
      }else{
        res.json({error:'invalid work type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;
        const response=await person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.json({error:'person not found'});
        }
        console.log('data updated')
        res.json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const respons=await person.findByIdAndDelete(personId);
        if(!respons){
            return res.json({error:'person not found'});
        }
        console.log('data deleted');
        res.json({message:'person deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    
    }
})


module.exports=router;
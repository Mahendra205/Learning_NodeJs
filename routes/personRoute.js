const express=require('express');
const router=express.Router();
const person=require('../models/person');
const {jwtAuthMiddleware,genarateToken}=require('../jwt')

router.post('/signup',async(req,res)=>{
    try{
     const data=req.body//assuming the request body contain the person data
     //create a new person document using mpngodb model
 
     const newPerson=new person(data);
 
     //save the new person to the database
     const respons=await newPerson.save();
     console.log('data saved');

     const payLoad={
      id:respons.id,
      username:respons.username
     }
     console.log(JSON.stringify(payLoad));
     const token=genarateToken(payLoad);
     console.log("token is: ",token);


     res.status(200).json({respons:respons,token:token});
    }catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }
})


//Login route
router.post('/login',async(req,res)=>{
  try{
    //Extract username and password from request body
    const{username,password}=req.body;

    //find the user by username
    const user=await person.findOne({username:username});

    //if user does not exist or password doesnot match return error
    if(!username || !(await user.comparePassword(password))){
      return res.status(401).json({error:'invalid username or password'})
    }

    //genarate token
    const payload={
      id:user.id,
      username:user.username
    }
    const token=genarateToken(payload);

    //return token as respons
    res.json({token})
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});

  }
})


//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
   const userData=req.user;
   console.log("user data: ",userData);
   const userId=userData.id;
   const user=await person.findById(userId);
   res.status(200).json({user});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})


//get method to get person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
      const data=await person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
})

//get method to get person by using their worktype
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
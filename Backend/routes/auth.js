const express =require('express');
const router =express.Router();
const User =require('../MODELS/User');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const bodyParser=require('body-parser');
const cors=require('cors');

router.post('/oo',async(req,res)=>{
    res.json({message:'yes bro'});
})
router.post('/register',async(req,res,next)=>{
    try{
        const {name,password,email,age,gender} =req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({message: 'Email already exist'});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            password:hashedPassword,
            email,
            age,
            gender
            
        });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
           // name:existingUser.name
        });
    }   
    catch(err){
        res.status(500).json({message: err.message});
    }



})

router.post('/login',async (req,res)=>{
    try{
    const {email,password}=req.body;

    const existingUser =await User.findOne({email});
    if(!existingUser){
        return res.status(409).json({message: 'Invalid Credentials'});
    }
      const isPasswordCorrect =await bcrypt.compare(password,existingUser.password);

      if(!isPasswordCorrect){
        return res.status(401).json({message:'Invalid Credentials'});
      }
     const accesstoken=jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
     });
    /* const refreshToken=jwt.sign({id : existingUser._id},process.env.JWT_REFRESH_SECRET_KEY );
      existingUser.refreshToken = refreshToken;*/
      await existingUser.save();

//res.cookie('refreshToken',refreshToken,{httpOnly: true , path: '/refresh_token'});

     res.status(200).json({
        accesstoken,
       // refreshToken,
        message:'User logged in Successfully',
        name:existingUser.name
     });

    }
    catch(err){
       next(err);
    }

})
 

module.exports=router
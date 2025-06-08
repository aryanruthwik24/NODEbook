const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT =8003;
require('dotenv').config();
const app=express();
require('./db');
const User =require('./MODELS/User');
const Notes=require('./MODELS/Notes');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const cookieParser =require('cookie-parser');
app.use(express.json()); 

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

/*app.use('api/auth',require('./routes/auth'))
app.use('api/notes',require('./routes/notes'))*/

app.post('/register',async(req,res,next)=>{
    try{
        const {name,password,email,age,gender} =req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({message: 'Email already exist'});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        await User.create({email:email,name: name,password:hashedPassword,age:age,gender:gender});
        
        res.status(201).json({
            message: 'User registered successfully',
            useremail:email
        });
    }   
    catch(err){
        res.status(500).json({message: err.message});
    }



})

app.post('/login',async (req,res)=>{
    try{
    const {email,password}=req.body;

    const existingUser =await User.findOne({email});
    if(!existingUser){
        return res.status(409).json({message: 'You dont have an account please REGISTER'});
    }
      const isPasswordCorrect =await bcrypt.compare(password,existingUser.password);

      if(!isPasswordCorrect){
        return res.status(401).json({message:'Invalid Credentials'});
      }
     const accesstoken=jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
     });
     res.status(200).json({
        accesstoken,
        message:'User logged in Successfully',
        useremail:email
     });

    }
    catch(err){
       next(err);
    }

})
app.get('/getmyprofile',async(req,res)=>{
   
    try{
        const {token} =req.body;
        console.log(token);
        
        const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded);
        const user = await User.findById(decoded.id);
       
        res.status(200).json({user});


    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})



////////////////////////notes/////////////////////////////

app.post('/createTOdo',async (req,res)=>{
    try {
        const {email,title,description,tag}=req.body;
        
        await Notes.create({email: email,title:title,description:description,tag:tag});
        res.status(201).json({
            message: 'notes created successfully'
          
        });

    } catch (err) {
        res.status(500).json({message: err.message});
    }
})
app.post('/getAllTodos',async(req,res)=>{
    
    try{
        const {email}=req.body;
        const notesF=await Notes.find({email});
        res.status(201).json({message:'success',notesF });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    
})
app.delete('/deletenote',async(req,res)=>{
    try{
      const {_id}=req.body;

    await Notes.deleteOne({_id:_id});
    res.status(201).json({message:'success'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})
app.put('/updatenotes',async(req,res)=>{
    try{
    const {_id,tag,title,description}=req.body;

    await Notes.updateOne({_id:_id},{$set:{tag:tag,title:title,description:description}});
    res.status(201).json({message:'success'});

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})




app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`);
});
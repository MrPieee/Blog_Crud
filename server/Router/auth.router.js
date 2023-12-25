const authRouter=require('express').Router();

const bcrypt=require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');
const cheakAuth = require('../CheakAuth/CheakAuth');
const User = require('../model/admin.model');
require('dotenv').config();

// User Register and add user in db
authRouter.post('/user/signUp',async(req,res)=>{
    try {
      const{name,email,username,password}=req.body;
      if(email && username && password){
         const userEmail=await User.findOne({email:email});
         const userUsername=await User.findOne({username:username});
          if(userEmail)return res.status(400).json({message:'The email used already another account'});
          if(userUsername)return res.status(400).json({message:'Username is not available'});
          if(!userEmail && !userUsername){
              bcrypt.hash(password, saltRounds, async (err, hash) => {
                  const addUser=new User({
                      name:name,
                      email:email,
                      username:username,
                      password:hash,
                  });
                  const newUser=await addUser.save();
                  res.status(201).json({
                      message:'User Registation Successfully'
                  });
              });
          
          }
      }else{
          return  res.status(404).json({message:'Please Fill The Form'});
      }
     
    } catch{
        return res.status(500).json({message:'Internal server error'});
    }
  });
  
  
  // User LogIn 
  
  authRouter.post('/user/logIn',async(req,res)=>{
   try {
    const{email,password}=req.body;
    if(email&&password){
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:`Don't match your mail`});
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(404).json({
                success:false,
                message:'Dont Match The password'
            });
        }
    
        if(user.email===email && bcrypt.compareSync(password, user.password)){
            const payload={
                username:user.username,
                userId:user._id
            }
             const token= jwt.sign(payload, process.env.JWT_SECRET,  { expiresIn: '7d' });
     
               res.cookie("token",token,{
                  httpOnly:true,
                 maxAge:'604800000'
               });  
              return res.status(200).json({
                success:true,
                message:'User Logged In Successfully',
                username:user.username,
                // token:token
          });
  
     }
  
    }else{
        return res.status(404).json({message:'Please Enter your mail and password'});
    }
   } catch (error) {
    return res.status(500).json({message:'Internal server error'});
   }
     
  });


    // Google LogIn

    authRouter.post('/user/googleLogin',async(req,res)=>{
        try {
            const {email,username}=req.body;
            const user=await User.findOne({email:email});
            const oldUsername=user.username;
            if(user && oldUsername===username) {
                    const payload={
                        username:user.username,
                        userId:user._id
                    }
                    const token= jwt.sign(payload, process.env.JWT_SECRET,  { expiresIn: '7d' });
            
                    res.cookie("token",token,{
                        httpOnly:true,
                        maxAge:'604800000'
                    });  
                    return res.status(200).json({
                        success:true,
                        message:'User Logged In Successfully',
                        username:user.username,
                        token:token
                    });
            }

            if(user && oldUsername!==username){
                return res.status(400).json({message:'User Already exist'});
            }

            if(!user){
                    const addUser=new User({
                        name:req.body.name,
                        email:email,
                        password:'',
                        username:username,
                        profilePic:req.body.profilePic,
                    });
                    const newUser=await addUser.save();
                        const payload={
                            username:newUser.username,
                            userId:newUser._id
                        }
                        const token= jwt.sign(payload, process.env.JWT_SECRET,  { expiresIn: '7d' });
                
                        res.cookie("token",token,{
                            httpOnly:true,
                            maxAge:'604800000'
                        });  
                    return res.status(200).json({
                        success:true,
                        message:'User Logged In Successfully',
                        username:newUser.username,
                        token:token
                });
           }
          
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    });



  
  // user logout
  authRouter.post('/user/logOut',(req,res)=>{
      res.clearCookie('token').json({
          message:'User Logout Successfully'
      });
      // res.redirect('/login');
  });
  
  authRouter.get('/auth',(req,res)=>{
      const {token}=req.cookies;
      if(token){
          return res.status(200).json({auth:true});
      } 
      if(!token){
          return res.status(200).json({auth:false});
      }
  });

  authRouter.get('/user/profile',cheakAuth,async(req,res)=>{
    try {
     // const username=req.username;
     const user=await User.findOne({username:req.username});
     if(user){
         res.status(200).json(user);
     }
     
    } catch{
        return res.status(500).json({message:'Internal server error'});
    }
 });

 module.exports=authRouter;
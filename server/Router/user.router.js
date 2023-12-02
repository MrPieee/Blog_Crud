const userRouter=require('express').Router();
// const postModel = require('../Model/post.model');
const bcrypt=require('bcrypt');
const saltRounds = 10;
const User = require('../model/admin.model');

// Sigle User Get From Db with username
userRouter.get('/users',async(req,res)=>{
    try{
        const user=await User.find();
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({message:`No One Find the Data `});
        }
    }catch(error){

        return res.status(404).json({message:error.message});
   }
});


// Sigle User Get From Db with username
userRouter.get('/user/singleUser/:username',async(req,res)=>{
    try{
        const username=req.params.username;
        const singleUser=await User.findOne({username:username});
        if (singleUser) {
            return res.status(200).json(singleUser);
        } else {
            return res.status(404).json({message:`No One Find the Data on ${username}`});
        }
    }catch(error){

        return res.status(404).json({message:error.message});
   }
});


// Update UserPass or Set newPass(google user) From DB

userRouter.patch('/user/updatePass/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const user= await User.findOne({_id:id});
        if(user.password){
            try {
             const{oldPass,newPass}=req.body;
                if(oldPass && newPass){
                    if(bcrypt.compareSync(oldPass, user.password)){
                        bcrypt.hash(newPass, saltRounds, async (err, hash) => {
                            const updatePass= await User.updateOne(
                                {_id:id},
                                {
                                    $set:{
                                    password:hash
                                }},{new:true});
                                if(updatePass){
                                    return res.status(200).json({message:`Your password has been uptdated`});
                                }
                        })
                    }else{
                        return res.status(404).json({message:`Your password is incorrect`});
                    }
                }
            } catch (error) {
                return res.status(404).json({message:`UpdatePassErr===> ${error.message}`});    
            }
        }

        if(!user.password){
            try {
                const password=req.body.password
                    bcrypt.hash(password, saltRounds, async (err, hash) => {
                        const setPass= await User.updateOne(
                            {_id:id},
                            {
                                $set:{
                                password:hash
                            }},{new:true});
                            if(setPass){
                                return res.status(200).json({message:`New password has been added`});
                            }
                    });
            } catch (error) {
                return res.status(404).json({message:`NewPassErr===> ${error.message}`});   
            }
        }

    } catch (error) {
        return res.status(404).json({message:error.message});    
    }
});

// user Data update 
userRouter.patch('/user/updateData/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const userDataUpdate= await User.findOneAndUpdate({_id:id},{$set:req.body},{new:true});
        if(userDataUpdate){
            res.status(201).json({message:"User data has been updated"});
        }

    } catch (error) {
        return res.status(404).json({message:error.message});    
    }
});




// Delete User From DB
userRouter.delete('/user/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteUser= await User.deleteOne({_id:id});
        // const deleteUserPost=await postModel.deleteMany({user:id});
        if (deleteUser) {
            return res.clearCookie('token').status(203).json({message:"Your account has been delete"});
        } else {
            return res.status(404).json({message:`User Could not find`});
        }
    } catch (error) {
        return res.status(404).json({message:error.message});    
    }
});


module.exports=userRouter;

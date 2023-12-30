const userRouter=require('express').Router();
// const postModel = require('../Model/post.model');
const path =require('path');
const bcrypt=require('bcrypt');
const saltRounds = 10;
const multer=require('multer');
const User = require('../model/admin.model');
const blogModel = require('../model/blog.model');
const commentModel = require('../model/comment.model');



// For Profile Pics Update.....

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/userProfile');
    },
    filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname);
        const filename=file.originalname.replace(fileExt,"").toLowerCase().split(' ').join('-'+"-"+Date.now());
        cb(null,filename+fileExt);  
        // console.log(file);  
    }
  });
  
  const upload=multer({
    storage:storage,
    limits:{
        fileSize:10000000
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
            cb(null,true);
        }else{
            cb(new Error('Only accept for image'));
        }
    }
  });
////////////



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

userRouter.patch('/user/updatePass/:userId',async(req,res)=>{
    try {
        const id=req.params.userId;
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
                        return res.status(404).json({message:`Your password is incorrect`,status:404});
                    }
                }
            } catch (error) {
                return res.status(404).json({message:`UpdatePassErr===> ${error.message}`,status:404});    
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
                return res.status(404).json({message:`NewPassErr===> ${error.message}`,status:404});   
            }
        }

    } catch (error) {
        return res.status(500).json({message:error.message,status:500});    
    }
});

// user Data update 
userRouter.patch('/user/updateDataWithProfile/:id',upload.single('proflePhoto'),async(req,res)=>{
    try {
        const profile =req.file.filename;
         const id=req.params.id;
         const user=await User.findById(id);
         const userUpdate= await User.findOneAndUpdate({_id:id},{$set:{
             profilePic:profile,
             name:req.body.name,
         }},{new:true});

         const blogUserPUp=await blogModel.updateMany({user:id},{
            $set:{
                userPp:profile
            }
         },{new:true});

         const commentUserPUp=await commentModel.updateMany({commentUsername:user.username},{
            $set:{
                userPp:profile
            }
         },{new:true});

         if(userUpdate && blogUserPUp && commentUserPUp){
             res.status(201).json({message:"Profile has been updated",status:201});
         }

    } catch (error) {
        return res.status(404).json({message:error.message});    
    }
});


userRouter.patch('/user/updateData/:id',async(req,res)=>{
    try {
         const id=req.params.id;
         const userDataUpdate= await User.findOneAndUpdate({_id:id},{$set:{
            name:req.body.name,
        }},{new:true});
        if(userDataUpdate){
            res.status(201).json({message:"Profile has been updated",status:201});
        }
    } catch (error) {
        return res.status(500).json({message:error.message});    
    }
});


// Delete User From DB
userRouter.delete('/user/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteUser= await User.deleteOne({_id:id});
        const deleteUserBlog=await blogModel.deleteMany({user:id});
        if (deleteUser && deleteUserBlog ) {
            return res.clearCookie('token').status(203).json({message:"Your account has been delete"});
        } else {
            return res.status(404).json({message:`Dont Delete Your Account`});
        }
    } catch (error) {
        return res.status(404).json({message:error.message});    
    }
});


module.exports=userRouter;

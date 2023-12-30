const blogModel = require('../model/blog.model');
const blogRouter=require('express').Router();
const multer=require('multer');
const path =require('path');
const commentModel = require('../model/comment.model');

const shuffle = (a) => {
  for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'./public/blogImages');
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
          cb(new Error('Only accept for JPG/JPEG/PNG type file'));
      }
  }
});

// blogRouter.post('/imageUp',upload.single('blogPhoto'),async(req,res)=>{
//   res.status(200).json('Successfully');
//   console.log(req.file);
// })


// Post blog in DB
blogRouter.post('/blog/blogPost',upload.single('blogPhoto'),async(req,res)=>{

  try {
    if (req.body.title&&req.body.dsc&&req.body.userId) {
        const newblog=new blogModel({
            title:req.body.title,
            dsc:req.body.dsc,
            catagory:req.body.catagory,
            photo:req.file.filename,
            user:req.body.userId,
            username:req.body.username,
            userPp:req.body.userProfile,
        });
        await newblog.save();
        return res.status(200).json({message:"Your blog is successsfully posted",id:newblog._id});
       } else {
        return res.status(400).json({message:"Please title and dsc has add the post "});
       }
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
});

// Get blog from DB

// Single blog from DB
blogRouter.get("/blog/singleBlog/:blogId",async(req,res)=>{
 try {
  const blogId=req.params.blogId;
  const singleblog=await blogModel.findById(blogId);
  if (singleblog) {
    return res.status(200).json(singleblog);
  } else {
    return res.status(400).json({message:"Sorry..!!can't find the blog"});
  }
 } catch (error) {
  return res.status(400).json({message:error.message});
 };
});




// Get userBlog from bd
blogRouter.get("/blog/userBlogs/:userId",async(req,res)=>{
  try {
   const userId=req.params.userId;
   const userblogs=await blogModel.find({user:userId});
   if (userblogs) {
     return res.status(200).json(userblogs);
   } else {
     return res.status(400).json({message:"Sorry..!!can't find your blogs"});
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });


// Get Catagoryways blog from bd
blogRouter.get("/blog/catagoryWaysBlog/:blogCata",async(req,res)=>{
  try {
   const blogCata=req.params.blogCata;
   const catagoriesBlog=await blogModel.find({catagory:blogCata});
   if (catagoriesBlog) {
    shuffle(catagoriesBlog);
    return res.status(200).json(catagoriesBlog);
   } else {
     return res.status(400).json({message:"Sorry..!!can't find your blogs"});
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });

// Get All Blog from Db


 blogRouter.get("/blog/allBlogs",async(req,res)=>{
  try {
   const userblogs=await blogModel.find();
   if (userblogs) {
    shuffle(userblogs);
     return res.status(200).json(userblogs);
    
   } else {
     return res.status(400).json({message:"Sorry..!!can't find your blogs"});
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });


//  Update Blog from DB

blogRouter.put("/blog/updateI/:blogId",upload.single('blogPhoto'),async(req,res)=>{
  try {
    const blogId=req.params.blogId;
    const updateblog=await blogModel.updateOne({_id:blogId},{$set:{
            title:req.body.title,
            dsc:req.body.dsc,
            catagory:req.body.catagory,
            photo:req.file.filename,
    }});
    if(updateblog){
      return res.status(200).json({message:"Your blog has been updated"});
    }else{
    return res.status(400).json({message:`Sorry..!! Your blog hasn't updated`});
    }
  } catch (error) {
    return res.status(400).json({message:error.message});
  };

});

blogRouter.put("/blog/updateO/:blogId",async(req,res)=>{
  try {
    const blogId=req.params.blogId;
    const updateblog=await blogModel.updateOne({_id:blogId},{$set:{
            title:req.body.title,
            dsc:req.body.dsc,
            catagory:req.body.catagory,
    }});
    if(updateblog){
      return res.status(200).json({message:"Your blog has been updated"});
    }else{
    return res.status(400).json({message:`Sorry..!! Your blog hasn't updated`});
    }
  } catch (error) {
    return res.status(400).json({message:error.message});
  };

});

// Delete blog from DB

blogRouter.delete("/blog/delete/:blogId",async(req,res)=>{
  try {
    const userId=req.body.userId;
    const blogId=req.params.blogId;
    const blog=await blogModel.findById(blogId);

    if (blog.user===userId) {
      const deleteblog=await blogModel.findByIdAndDelete(blogId);
      const deleteBlogComments=await commentModel.deleteMany({blogId:blogId});

      if(deleteblog&&deleteBlogComments){
        return res.status(200).json({message:"Your blog has been deleted"});
      }
    } else {
      return res.status(404).json({message:`Sorry..!! Your Can't delete Another user Blog`});
    }
 
  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});

blogRouter.delete("/blog/deleteAll/:username",async(req,res)=>{
  try {
    const username=req.params.username;
      const deleteblog=await blogModel.deleteMany({username:username});
      // const deleteBlogComments=await commentModel.deleteMany({blogId:blogId});

      if(deleteblog){
        return res.status(200).json({message:"Your blog has been deleted"});
      }

  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});




module.exports=blogRouter;
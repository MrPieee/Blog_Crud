const blogModel = require('../model/blog.model');

const blogRouter=require('express').Router();

// add blog in DB
blogRouter.post('/blog/blogBlog',async(req,res)=>{

  try {
    if (req.body.title&&req.body.dsc&&req.body.userId) {
        const newblog=new blogModel({
            title:req.body.title,
            dsc:req.body.dsc,
            catagory:req.body.catagory,
            photo:req.body.photo,
            user:req.body.userId,
            username:req.body.username,
            userPp:req.body.userProfile,
        });
        await newblog.save();
        return res.status(200).json({message:"Your blog is successsfully bloged"});
       } else {
        return res.status(400).json({message:"Please title and dsc has add the blog "});
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
// User blog from DB
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

 blogRouter.get("/blog/allBlogss",async(req,res)=>{
  try {
  //  const userId=req.params.userId;
   const userblogs=await blogModel.find();
   if (userblogs) {
     return res.status(200).json(userblogs);
   } else {
     return res.status(400).json({message:"Sorry..!!can't find your blogs"});
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });


//  Update Blog from DB

blogRouter.patch("/blog/update/:blogId",async(req,res)=>{
  try {
    const blogId=req.params.blogId;
    const updateblog=await blogModel.updateOne({_id:blogId},{$set:req.body});
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
    const blogId=req.params.blogId;
    const deleteblog=await blogModel.findByIdAndDelete(blogId);
    if(deleteblog){
      return res.status(200).json({message:"Your blog has been deleted"});
    }else{
    return res.status(404).json({message:`Sorry..!! Your blog hasn't deleted`});
    }
  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});





module.exports=blogRouter;
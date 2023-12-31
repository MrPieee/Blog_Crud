const commentModel = require('../model/comment.model');
const blogModel = require('../model/blog.model');
const commentRouter=require('express').Router();

// Post a comment in DB
commentRouter.post('/comment/commentPost',async(req,res)=>{
  try {
    const newcomment=new commentModel({
        blogId:req.body.blogId,
        commentUsername:req.body.username,
        userPp:req.body.userProfile,
        comment:req.body.comment,
    });
    await newcomment.save();
    return res.status(200).json({message:"Your comment is successsfully Added",comment:newcomment});
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
});

// Get An user comments from Db

 commentRouter.get("/comment/userComments/:username",async(req,res)=>{
  try {
    const username=req.params.username;
   const userComments=await commentModel.find({commentUsername:username});
   if (userComments) {
     return res.status(200).json(userComments);
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });

//  commentRouter.get("/comment/userComment",async(req,res)=>{
//   try {
 
//    const userComments=await commentModel.find();
//    if (userComments) {
//      return res.status(200).json(userComments);
//    }
//   } catch (error) {
//    return res.status(400).json({message:error.message});
//   };
//  });
 // Get Blog comments from Db

 commentRouter.get("/comment/blogcomments/:blogId",async(req,res)=>{
  try {
   const blogComments=await commentModel.find({blogId:req.params.blogId});
   if (blogComments) {
     return res.status(200).json(blogComments.reverse());
   } else {
     return res.status(400).json({message:"Sorry..!!can't find this blog comments"});
   }
  } catch (error) {
   return res.status(400).json({message:error.message});
  };
 });


// Delete comment from DB

commentRouter.delete("/comment/delete/:commentId",async(req,res)=>{
  try {
    const commentId=req.params.commentId;
    const username=req.body.username;
    const comment=await commentModel.findById(commentId);
    const blog=await blogModel.findById(comment.blogId);

    if (comment.commentUsername===username||blog.username===username) {
        const deletecomment=await commentModel.findByIdAndDelete(commentId);
        if(deletecomment){
            return res.status(200).json({message:"Your comment has been deleted"});
          }
    } else {
        return res.status(404).json({message:`Sorry..!! You also delete your comment `});
    }

  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});


// Delete a user all comments from DB

commentRouter.delete("/comment/deleteUserComments/:username",async(req,res)=>{
  try {
    const username=req.params.username;
    const deletecomments=await commentModel.deleteMany({commentUsername:username});
    if(deletecomments){
        return res.status(200).json({message:"Your all comments has been deleted"});
      }


  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});



module.exports=commentRouter;
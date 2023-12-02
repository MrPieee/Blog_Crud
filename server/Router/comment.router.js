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
    return res.status(200).json({message:"Your comment is successsfully Added"});
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
});

// Get All comment from Db

 commentRouter.get("/comment/allcomments",async(req,res)=>{
  try {
   const userComments=await commentModel.find();
   if (userComments) {
     return res.status(200).json(userComments);
   } else {
     return res.status(400).json({message:"Sorry..!!can't find this posts comments"});
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
            return res.status(200).json({message:"This comment has been deleted"});
          }
    } else {
        return res.status(404).json({message:`Sorry..!! You also delete your comment `});
    }

  } catch (error) {
    return res.status(404).json({message:error.message});
  };

});



module.exports=commentRouter;
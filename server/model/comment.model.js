const mongoose=require('mongoose'); 

// Create Users Schema

const commentSchema=new mongoose.Schema({
   blogId:{
        type:String,
        require:true,
    },
    commentUsername:{
        type:String,
        require:true,
    },
    userPp:{
        type:String,
        default:'',
        require:true,
    },
    comment:{
        type:String,
        default:'',
        require:true,
    }
});



 const commentModel=mongoose.model("comments",commentSchema);

 module.exports=commentModel;
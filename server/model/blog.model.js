const mongoose=require('mongoose'); 

// Create Users Schema

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        default:'',
        require:true,
    },
    dsc:{
        type:String,
        default:'',
        require:true,
    },
    photo:{
        type:String,
        default:''
    },
    catagory:{
        type:String,
        default:'',
        require:true,
    }
    ,
    user:{
        type:String,
        default:'',
        require:true,
    },
    username:{
        type:String,
        default:'',
        require:true,
    },
    userPp:{
        type:String,
        default:'',
        require:true,
    },
});



 const blogModel=mongoose.model("blogs",blogSchema);

 module.exports=blogModel;
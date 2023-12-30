const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true,
        minLength:[4,"username Must Min 4 Charachter"],
        trim:true,
        lowercase:true,
        validate:{
            validator:(v)=>{
                return /\b^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,20}$\b/.test(v);
            },
            message:(props)=>`${props.value}  is not a valid username`
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        validate:{
            validator:(v)=>{
                return /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(v);
            },
            message:(props)=>`${props.value}is not a valid email`
        }
    }, 
    googleUser:{
        type:Boolean,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }, 
    profilePic:{
        type:String,
        default:"https://i.postimg.cc/xCHs0vfR/user2.jpg"
    },

});


const User=mongoose.model('usersCollection',UserSchema);

module.exports=User;
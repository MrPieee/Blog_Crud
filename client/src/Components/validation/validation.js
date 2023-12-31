
export const Validation=(value,users=[])=>{
    const errors={};

    const email_pattern=/\b[\w-]+@[\w-]+\.\w{2,4}\b/;
    const username_pattern=/\b^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,20}$\b/;

    if(value.name===''){
        errors.name="Name is Requried.!";
    };
    
    if(value.email===''){
        errors.email="Email is Requried.!";
    }else if(!email_pattern.test(value.email)){
        errors.email=`${value.email} is not a valid email`;
    }else if(users.find((usr)=>usr.email===value.email)){
        errors.email=`The mail already exist`;
    };
    
    if(value.username===''){
        errors.username="Username is Requried.!";
    } else if(!username_pattern.test(value.username)){
        errors.username=`${value.username}  is not a valid username`;
    }else if(users.find((usr)=>usr.username===value.username)){
        errors.username=`The username already exist`;
    };

    if(value.password===''){
        errors.password="Password is Requried.!";
    }else if(value.password.length <= 5){
        errors.password="Password must have been give 6 Charrecter.!";
    };

    return errors;
};



export const usernameValid=({username,name})=>{
    const errors={};
    const username_pattern=/\b^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,20}$\b/;
    if(name===''){
        errors.message="name is Requried.!";
    }
    if(username===''){
        errors.message="Username is Requried.!";
    } else if(!username_pattern.test(username)){
        errors.message=`${username}  is not a valid username`;
    };
    return errors;
}
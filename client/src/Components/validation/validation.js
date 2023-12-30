
export const Validation=(value)=>{

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
    };
    
    if(value.username===''){
        errors.username="Username is Requried.!";
    } else if(!username_pattern.test(value.username)){
        errors.username=`${value.username}  is not a valid username`;
    };

    if(value.password===''){
        errors.password="Password is Requried.!";
    }else if(value.password.length <= 5){
        errors.password="Password must have been give 6 Charrecter.!";
    };

    return errors;
};



export const usernameValid=(value)=>{
    const errors={};
    const username_pattern=/\b^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,20}$\b/;
    if(value.username===''){
        errors.username="Username is Requried.!";
    } else if(!username_pattern.test(value.username)){
        errors.username=`${value.username}  is not a valid username`;
    };
    return errors;
}
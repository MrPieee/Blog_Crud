import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Validation } from '../validation/validation';
import { GoogleLogin } from '../GoogleLogIn/Google';

const Register = () =>  {

  const [userInp,setUserInp]=useState({
    name:'',
    email:'',
    username:'',
    password:''
  });

  const [allUsers,setAllUsers]=useState([]);

  useEffect(()=>{
    const AllUserFetch=async()=>{
        await fetch('/api/users')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setAllUsers(res);
          };
        });
      };
      AllUserFetch();
  },[])

  const [error,setError]=useState({})

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError(Validation(userInp,allUsers));
  }

  const handleInputValue=(e)=>{
    setUserInp({
        ...userInp,
        [e.target.name]:e.target.value
    })
  };

  const handleRegistaton= async ()=>{
    if(!error.name && !error.email && !error.username && !error.password){
        const {name,email,username,password}=userInp;
        if(name && email && username && password){

            await fetch('/api/user/signUp',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    username:username,
                    password:password,
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res.status===201){
                  window.location.href='/logIn';
                  console.log(res.message);
                }
            })
            .catch((error)=>{
                alert(error.message);
            });
        };
    };
  };
 

   const handleGoogleLogIn=()=>{
        GoogleLogin();
   };


    return (
        <div className=' login '>
            <div className="logInCont flexColCenter">
                <form onSubmit={handleSubmit} className=' flexColCenter'>
                        <input  onChange={handleInputValue}  type='text' name="name" placeholder='Write your Accurate name'/>
                        {error.name&& <p className=' colorDanger'>{error.name}</p>}

                        <input  onChange={handleInputValue} type="text" name="username" placeholder='Write a username' />
                        {error.username&& <p className=' colorDanger'>{error.username}</p>}

                        <input  onChange={handleInputValue} type="email" name="email"  placeholder='Write your Verified Mail'/>
                        {error.email&& <p className=' colorDanger'>{error.email}</p>}

                        <input  onChange={handleInputValue} type="password" name="password" placeholder='Write a Strong Password'  onMouseUp={(e)=>e.target.type="text"} onMouseOut={(e)=>e.target.type="password"}/>
                        {error.password&& <p className=' colorDanger'>{error.password}</p>}

                        <button onClick={handleRegistaton} style={{backgroundColor:'green'}} type="submit">Sign Up</button>

                        <p style={{color:'blue'}}>Already have an account / <Link to={'/login'}>LogIn</Link> </p>
                        <h3 className=' colorBlack mg1'>or</h3>
                </form>
                <button onClick={handleGoogleLogIn} className='googleBtn' > <FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Register;

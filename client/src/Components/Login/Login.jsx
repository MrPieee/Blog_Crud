import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLogin } from '../GoogleLogIn/Google';

const Login = () => {

    const [userInp,setUserInp]=useState({
        email:'',
        password:''
      });

      const handleInputValue=(e)=>{
        setUserInp({
            ...userInp,
            [e.target.name]:e.target.value
        })
      };
    
      const handleLogIn= async () => {
         const {email,password}=userInp;
         if(email && password){
            await fetch('/api/user/logIn',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res){
                    alert(res.message);
                    window.location.href='/';
                }
            })
            .catch((error)=>{
                alert(error.message);
            });
         };
      };
     
      const handleGoogleLogIn=()=>{
        GoogleLogin();
      };



    return (
        <div className=' login '>
            <div className="logInCont flexColCenter">
                <form onSubmit={(e)=>e.preventDefault()} className=' flexColCenter'>
                        <input onChange={handleInputValue} required type="email" name="email" id="email" placeholder='Your mail'/>
                        

                        <input onChange={handleInputValue} required type="password" name="password"  onMouseUp={(e)=>e.target.type="text"} onMouseOut={(e)=>e.target.type="password"} placeholder='Give your password'/>

                        <button  onClick={handleLogIn} type="submit">Log In</button>

                        <p>Don't have any account / <Link to={'/register'}>Register</Link> </p>

                        <h3 className=' colorBlack mg1'>or</h3>

                </form>
                <button onClick={handleGoogleLogIn} className='googleBtn'> <FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;

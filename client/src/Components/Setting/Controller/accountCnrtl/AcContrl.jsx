import React, { useState } from 'react';
import './accCnt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faClose } from '@fortawesome/free-solid-svg-icons';
export const AcContrl = (props) => {

    const [password,setPassword]=useState('');
    const [err,setErr]=useState('');
    const user=props.user;
    const handleController=props.handleController;
    const {_id,name,username,profilePic}=user;

    const handleDeleteAcc=async(userId)=>{
        if(password){

          await fetch(`/api/user/account_delete/${userId}`,{
            method:"DELETE",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              password:password
            })
          }).then((res)=>res.json())
            .then((res)=>{
              if(res.status===400){
                setErr(res.message);
              }else{
                alert(res.message);
                window.location.href='/logIn';
              }
            }).catch((err)=>{ setErr(err.message)});

        }else{
          setErr('Please give your password');
        }
    };


  return (
    <div>
        <div className=' mg2'>
            <button onClick={()=>handleController('accountController')} className='colorWhite fontMd borderNone bgNone ' style={{cursor:'pointer'}}><FontAwesomeIcon icon={faArrowCircleLeft}/></button>
        </div>
        <div id="profileInfo" className=' flexColCenter'>
                <img src={profilePic==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?profilePic:`/userProfile/${profilePic}`} alt="profile" />
                <div className=" flexRowAiCenter">
                  <h3>{name}</h3>
                  <h4>@{username}</h4>
                </div><hr />
                <button className=' bgDanger borderRad3 fontMd  borderNone pd2 mg2' onClick={()=>{
                    document.querySelector('.popup').style.display='flex'
                  }}>Delete Your Account</button>
        </div>
        <div className="popup">
            <div className="poCont">
              <div className=' mg2'>
                  <button className='  colorWhite fontMd borderNone bgNone' onClick={()=>{
                    document.querySelector('.popup').style.display='none'
                  }}><FontAwesomeIcon icon={faClose}/></button>
              </div>
              <h3>{name}, Are you sure your want to delete your Account...?</h3>
                <form onSubmit={(e)=>e.preventDefault()}>
                  <input type="password" name="passwod" onChange={(e)=>setPassword(e.target.value.trim())} placeholder='Give your password' />
                  <p className=' colorDanger'>{err}</p>
                    <button onClick={()=>handleDeleteAcc(_id)} className=' bgDanger borderRad3 fontMd  borderNone pd2 mg2'>Delete</button>
                </form>
            </div>
        </div>
    </div>
  );
};

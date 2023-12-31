import React, { useEffect, useState } from 'react';
import './controll.css';
import { AcContrl } from './accountCnrtl/AcContrl';
import { BlgCntrl } from './blgCntrl/BlgCntrl';
import { CmntCntrl } from './cmntCnrt/CmntCntrl';

export const Controll= () => {

    const [user,setUser]=useState({});

    const userFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setUser(res)
          };
        });
      };

      useEffect(() => {
        userFetch();
      }, []);

      const handleController=(elementName)=>{
        document.getElementById(elementName).style.display='none';
        document.querySelector('.controllNav').style.display='block';
      };

  return (
    <div className='controll'>
        <div className="controllNav ">
            <nav className="flexColAiCenter">
                <button onClick={()=>{
                  document.getElementById('accountController').style.display='block';
                  document.getElementById('blogController').style.display='none';
                  document.getElementById('commentController').style.display='none';
                  document.querySelector('.controllNav').style.display='none';
                }}>Account Controll -{'>'} Deletetion</button>
                <button onClick={()=>{
                  document.getElementById('accountController').style.display='none';
                  document.getElementById('blogController').style.display='block';
                  document.getElementById('commentController').style.display='none';
                  document.querySelector('.controllNav').style.display='none';
                }}>Blog Controller</button>
                <button onClick={()=>{
                  document.getElementById('accountController').style.display='none';
                  document.getElementById('blogController').style.display='none';
                  document.getElementById('commentController').style.display='block';
                  document.querySelector('.controllNav').style.display='none';
                }}>Comment Controller</button>
            </nav>
        </div>
        <div id="accountController">
            <AcContrl user={user} handleController={handleController}/>
        </div>
        <div id="blogController">
            <BlgCntrl userId={user._id} handleController={handleController} />
        </div>
        <div id="commentController">
            <CmntCntrl username={user.username} handleController={handleController}/>
        </div>
    </div>
  );
};

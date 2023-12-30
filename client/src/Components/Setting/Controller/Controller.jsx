import React, { useEffect, useState } from 'react';
import './controll.css';
import { AcContrl } from './accountCnrtl/AcContrl';

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
  return (
    <div className='controll'>
        <div className="controllNav ">
            <nav className="flexColAiCenter">
                <button>Account Controll -{'>'} Deletetion</button>
                <button>Blog Controller</button>
                <button>Comment Controller</button>
            </nav>
        </div>
        <div className="accountController">
            <AcContrl user={user}/>
        </div>
        <div className="blogController">
            
        </div>
        <div className="commentController">
            
        </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import './blogC.css';
import { faArrowCircleLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BlgCntrl = (props) => {

  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const [userBlogs,setUserBlogs]=useState([]);

    const userId=props.userId;
    const handleController=props.handleController;
    const userBlogFetch=async(userId)=>{
      await fetch(`/api/blog/userBlogs/${userId}`)
      .then((res)=>res.json())
      .then((res)=>{
        if (res) {
          setUserBlogs(res);
        };
      });
    };
    useEffect(() => {
        userBlogFetch(userId);
    }, [userId]);

    const handleDeleteBlogs=async(userId)=>{
        if(password){
          await fetch(`/api/blog/deleteAll/${userId}`,{
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
                document.querySelector('.bpopup').style.display='none';
                setUserBlogs([]);
              }
            }).catch((err)=>{ setErr(err.message)});
        }else{
          setErr('Provide your account password')
        }
    };

  return (
    <div>
      <button onClick={()=>handleController('blogController')} className='colorWhite fontMd borderNone bgNone ' style={{cursor:'pointer'}}><FontAwesomeIcon icon={faArrowCircleLeft}/></button>
        <div className="blgCntrCont flexColCenter">
            <div className="deleteBlogbtn">
                  {
                    userBlogs.length>=1
                    ?<button className='bgDanger borderRad3 fontMd  borderNone pd2 mg2'onClick={()=>{
                      document.querySelector('.bpopup').style.display='flex';
                    }} style={{cursor:'revert'}}>Delete All Blog</button>:''
                  }
            </div>
            <div className="userAllBlogs">
              {
               userBlogs.length>=1
               ? userBlogs.map((blog)=>{
                const {_id,photo,title}=blog;
                return( 
                    <div className='blog' key={_id}>
                        <img src={`/blogImages/${photo}`} alt="blogImage"/>
                        <p>{title}</p>
                    </div>
                  );
                }):<h1 className=' fontL fontItalic  colorYellow textCenter fontCourier'>You don't have posted any blogs.!!</h1>

              }
            </div>
        </div>

        <div className="bpopup">
            <div className="bpoCont">
              <div className=' mg2'>
                  <button className='  colorWhite fontMd borderNone bgNone' onClick={()=>{
                    document.querySelector('.bpopup').style.display='none';
                  }}><FontAwesomeIcon icon={faClose}/></button>
              </div>
              <h3>Are you sure your want to delete your all blogs...?</h3>
                <form onSubmit={(e)=>e.preventDefault()}>
                  <input type="password" name="passwod" onChange={(e)=>setPassword(e.target.value.trim())} placeholder='Give your password' />
                  <p className=' colorDanger'>{err}</p>
                    <button onClick={()=>handleDeleteBlogs(userId)} className=' bgDanger borderRad3 fontMd  borderNone pd2 mg2'>Delete</button>
                </form>
            </div>
        </div>


    </div>
  );
};

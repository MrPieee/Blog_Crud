import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from'@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isLoading,setIslodding]=useState(true);
  const [blogs,setBlogs]=useState([]);
    const [pUser,setPUser]=useState({});

    const pUserFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setPUser(res);
            setIslodding(false);
          };
        });
      };


  const fetchBlog=async()=>{
    await fetch('api/blog/allBlogs')
    .then((res)=>res.json())
    .then((res)=>{
      setBlogs(res);
      if (res) {
        setIslodding(false);
      }
    });
  };

  useEffect(() => {
    fetchBlog();
    pUserFetch();
  },[ ])
  
  const handleDeleteBlog= async (blogId) => {
        await fetch(`api/blog/delete/${blogId}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            userId:pUser._id
          })
        })
        .then((res)=>res.json())
        .then((res)=>{
          
          if (res) {
            setIslodding(false);
            alert(res.message);
            window.location.href='/';
          }
        });
  };


// console.log(blogs);
  return (
    <div className='home mgT4'>
        {
          isLoading===true?
          <h1>Loading</h1>
          :
          <div className='homeCont flexColCenter'>
          
              {
                blogs.map((blog)=>{
                  const {_id,photo,title,dsc,userPp,username}=blog;
                  return( 
                    <div className='blog borderRadHalf bgBlack width50 textCenter mgT1 pd3' key={_id}>
                      
                          <div className="blogUserInfo">
                            <Link to={pUser.username===username?'/Profile':`/user/${username}`} className=' textDecorNone colorBlack'> 
                              <div className=" flexRowAiCenter">
                                <img src={userPp} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
                                <p className=' fontSm fontItalic fontBold1 fontCourier'>{username}</p>
                              </div>
                            </Link>
                            {
                              pUser.username===username?
                              <div className="blogControll flexRowAiCenter">
                                <button><FontAwesomeIcon icon={faPencilAlt}/></button>
                                <button onClick={()=>handleDeleteBlog(_id)}><FontAwesomeIcon icon={faTrash}/></button>
                             </div>:''
                            }
                          </div>
                     
                      <img src={`/blogImages/${photo}`} alt="userprofile" className=' width70'/>
                      <h2>{title}</h2>
                      <p>{dsc.slice(0,200)} <Link to={`blog_details/${_id}`} className='DtLink'>.....</Link> </p>
                    </div>
                  );
                })
              }
          
          </div>
        }
        
    </div>
  );
};

export default Home;
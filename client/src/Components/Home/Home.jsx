import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const [isLoading,setIslodding]=useState(true);
  const [blogs,setBlogs]=useState([]);

  const fetchBlog=async()=>{
    await fetch('api/blog/allBlogs')
    .then((res)=>res.json())
    .then((res)=>{
      setBlogs(res);
      if (res) {
        setIslodding(false);
      }
    }).catch((err)=>alert(err.message));
  };

  useEffect(() => {
    fetchBlog();
  },[ ])
  
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
                  const {_id,catagory,photo,title,dsc,userPp,username}=blog;
                  return( 
                    <div className='blog border2 borderRadHalf bgWhite width50 textCenter mgT1 pd3' key={_id}>
                      <div className="blogUserInfo">
                        <img src={userPp} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
                        <p className=' fontSm fontItalic fontBold1 fontCourier'>{username}</p>
                      </div>
                      <img src={userPp} alt="userprofile" className=' width50'/>
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
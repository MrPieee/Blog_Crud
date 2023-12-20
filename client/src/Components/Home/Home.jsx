import React, { useEffect, useState } from 'react';
import './home.css';


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
                      <img src={userPp} alt="userprofile" className=' width50'/>
                      <h2>{title}</h2>
                      <h3>{dsc}</h3>
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
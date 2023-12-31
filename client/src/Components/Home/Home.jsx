import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from'@fortawesome/free-solid-svg-icons';
import { Footer } from '../footer/Footer';

const Home = () => {
  const [isLoading,setIslodding]=useState(true);
  const [blogs,setBlogs]=useState([]);
    const [pUser,setPUser]=useState({});

    const [programBlg,setProgramBlg]=useState([]);
    const [eduBlg,setEduBlg]=useState([]);
    const [succBlg,setSuccBlg]=useState([]);
    const [loveBlg,setLoveBlg]=useState([]);

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

  
  const programBlogFetch= async () => {
      await fetch(`/api/blog/catagoryWaysBlog/programming`)
      .then((res)=>res.json())
      .then((res)=>{
          setProgramBlg(res);
        if (res) {
          setIslodding(false);
        }
      }).catch((err)=>alert(err.message));
  };


const eduBlogFetch= async () => {
  await fetch(`/api/blog/catagoryWaysBlog/education`)
  .then((res)=>res.json())
  .then((res)=>{
      setEduBlg(res);
    if (res) {
      setIslodding(false);
    }
  }).catch((err)=>alert(err.message));
};

const succBlogFetch= async () => {
  await fetch(`/api/blog/catagoryWaysBlog/success`)
  .then((res)=>res.json())
  .then((res)=>{
      setSuccBlg(res);
    if (res) {
      setIslodding(false);
    }
  }).catch((err)=>alert(err.message));
};

const loveBlogFetch= async () => {
  await fetch(`/api/blog/catagoryWaysBlog/love`)
  .then((res)=>res.json())
  .then((res)=>{
      setLoveBlg(res);
    if (res) {
      setIslodding(false);
    }
  }).catch((err)=>alert(err.message));
};



  useEffect(() => {
    fetchBlog();
    pUserFetch();
    programBlogFetch();
    eduBlogFetch();
    succBlogFetch();
    loveBlogFetch();
  },[])
  
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
          <div className="loder">
              <div className="ring"></div> 
          </div>
          :
          <div className='homeCont flexColCenter'>
          
                <div className="homeSec">
                    <div className="left">
                        <div className="prgrmBlg">
                          <h3 className=' colorYellow fontCourier borderB3 mgB1'>Programming Blogs :</h3>

                          {
                            programBlg.slice(0,2).map((blg)=>{
                              const {_id,title,photo}=blg;
                              return(
                                <Link to={`/blog_details/${_id}`} style={{color:'white'}}>
                                  <div className="sideblg" key={_id}>
                                      <img src={`/blogImages/${photo}`}  alt="" />
                                      <p>{title.slice(0,25)}...</p>
                                  </div>
                                </Link>
                              )
                            })
                          }
                          <Link to={'/catagory/programming'} style={{color:'white',margin:'0'}}><h4>SEE ALL</h4></Link>
                        </div>
                        <div className="edumBlg">
                          <h3 className=' colorYellow fontCourier borderB3'>Eduaction Blogs :</h3>

                          {
                            eduBlg.slice(0,2).map((blg)=>{
                              const {_id,title,photo}=blg;
                              return(
                                <Link to={`/blog_details/${_id}`} style={{color:'white'}}>
                                  <div className="sideblg" key={_id}>
                                      <img src={`/blogImages/${photo}`}  alt="" />
                                      <p>{title.slice(0,25)}...</p>
                                  </div>
                                </Link>
                              )
                            })
                          }
                          <Link to={'/catagory/education'} style={{color:'white',margin:'0'}}><h4>SEE ALL</h4></Link>
                        </div>
                    </div>
                    <div className="middle">
                          {
                            blogs.map((blog)=>{
                            const {_id,photo,title,dsc,userPp,username}=blog;
                            return( 
                              <div className='blog borderRadHalf bgBlack width100 textCenter mgT1 pd3' key={_id}>
                                
                                    <div className="blogUserInfo">
                                      <Link to={pUser.username===username?'/Profile':`/user/${username}`} className=' textDecorNone colorBlack'> 
                                        <div className=" flexRowAiCenter">
                                          <img src={userPp==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?userPp:`/userProfile/${userPp}`} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
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
                        <footer ><Footer/></footer>
                    </div>
                    <div className="right">
                    <div className="succBlg">
                          <h3 className=' colorYellow fontCourier borderB3 mgB1'>Success Blogs :</h3>

                          {
                            succBlg.slice(0,2).map((blg)=>{
                              const {_id,title,photo}=blg;
                              return(
                                <Link to={`/blog_details/${_id}`} style={{color:'white'}}>
                                  <div className="sideblg" key={_id}>
                                      <img src={`/blogImages/${photo}`}  alt="" />
                                      <p>{title.slice(0,25)}...</p>
                                  </div>
                                </Link>
                              )
                            })
                          }
                          <Link to={'/catagory/success'} style={{color:'white',margin:'0'}}><h4>SEE ALL</h4></Link>
                        </div>

                        <div className="loveBlg">
                          <h3 className=' colorYellow fontCourier borderB3'>Love Blogs :</h3>

                          {
                            loveBlg.slice(0,2).map((blg)=>{
                              const {_id,title,photo}=blg;
                              return(
                                <Link to={`/blog_details/${_id}`} style={{color:'white'}}>
                                  <div className="sideblg" key={_id}>
                                      <img src={`/blogImages/${photo}`}  alt="" />
                                      <p>{title.slice(0,25)}...</p>
                                  </div>
                                </Link>
                              )
                            })
                          }
                          <Link to={'/catagory/love'} style={{color:'white',margin:'0'}}><h4>SEE ALL</h4></Link>
                        </div>
                    </div>
                </div>

          </div>
        }
        
    </div>
  );
};

export default Home;
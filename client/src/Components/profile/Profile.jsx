import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {

  const [loading,setLoading]=useState(true);

  const [user,setUser]=useState({});
  const [userBlogs,setUserBlogs]=useState([]);
  const {_id,name,username,profilePic}=user;
  
  const userFetch=async()=>{
    await fetch('/api/user/profile')
    .then((res)=>res.json())
    .then((res)=>{
      if (res) {
        setUser(res);
        setLoading(false);
      };
    });
  };


  const userBlogFetch=async(userId)=>{
    await fetch(`/api/blog/userBlogs/${userId}`)
    .then((res)=>res.json())
    .then((res)=>{
      if (res) {
        setUserBlogs(res);
        setLoading(false);
      };
    });
  };

  useEffect(() => {
    userFetch();
    userBlogFetch(_id);
  }, [_id]);

  const handleDeleteBlog= async (blogId) => {
      await fetch(`api/blog/delete/${blogId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userId:_id
        })
      })
      .then((res)=>res.json())
      .then((res)=>{
        
        if (res) {
          setLoading(false);
          alert(res.message);
          window.location.href='/';
        }
      });
  };

  return (
    <div className='profile'>
        {
          loading
          ?<h1>Loading...</h1>
          :
          <>
            <div className="profileInfo flexColCenter">
                <img src={profilePic==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?profilePic:`/userProfile/${profilePic}`} alt="profile" />
                <div className=" flexRowAiCenter">
                  <h3>{name}</h3>
                  <h4>@{username}</h4>
                </div><hr />
            </div>
            <div className="userBlogs flexColCenter">
                <div className="blogsHed">
                  <h3>Your Blogs :</h3>
                </div>
                {
                  userBlogs.map((blog)=>{
                    const {_id,photo,title,dsc,userPp,username}=blog;
                    return( 
                        <div className='blog borderRadHalf bgBlack textCenter mgT1 pd3' key={_id}>
                            <div className="blogUserInfo">
                              <Link to={'/Profile'} className=' textDecorNone colorBlack'> 
                                <div className=" flexRowAiCenter">
                                  <img src={userPp.slice(0,5)==='https'?userPp:`/userProfile/${userPp}`} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
                                  <p className=' fontSm fontItalic fontBold1 fontCourier'>{username}</p>
                                </div>
                              </Link>
                                <div className="blogControll flexRowAiCenter">
                                  <button><Link to={`/blog/${_id}/eidt-your-blog`} style={{color:'white'}}><FontAwesomeIcon icon={faPencilAlt}/></Link></button>
                                  <button onClick={()=>handleDeleteBlog(_id)}><FontAwesomeIcon icon={faTrash}/></button>
                              </div>
                          </div>
                            <img src={`/blogImages/${photo}`} alt="blogPhoto" className=' width50'/>
                            <h2>{title}</h2>
                            <p>{dsc.slice(0,200)} <Link to={`/blog_details/${_id}`} className='DtLink'>.....</Link> </p>
                        </div>
                      );
                    })
                }
            </div>
          </>
        }
    </div>
  );
};

export default Profile;
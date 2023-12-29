import React, { useEffect, useState } from 'react';
import './singleUser.css';
import { Link ,useParams} from 'react-router-dom';


const SingleUser = () =>{

    const [loading,setLoading]=useState(true);
    const {sUsername}=useParams();

    // const [pUser,setPUser]=useState({});
    const [sUser,setSUser]=useState({});
    const [userBlogs,setUserBlogs]=useState([]);
    
    const {_id,username,name,profilePic}=sUser;

//   const pUserFetch=async()=>{
//       await fetch('/api/user/profile')
//       .then((res)=>res.json())
//       .then((res)=>{
//         if (res) {
//           setPUser(res);
//           setLoading(false);
//         };
//       });
//     };

    const userFetch=async(username)=>{
        await fetch(`/api/user/singleUser/${username}`)
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setSUser(res);
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
        // pUserFetch();
        userFetch(sUsername);
      userBlogFetch(_id);
    }, [_id,sUsername]);

    return (
      <div className='sUser'>
          {
            loading
            ?<h1>Loading...</h1>
            :
            <>
              <div className="sUserInfo flexColCenter">
                  <img src={profilePic} alt="profile" />
                  <div className=" flexRowAiCenter">
                    <h3>{name}</h3>
                    <h4>@{username}</h4>
                  </div><hr />
              </div>
              <div className="userBlogs flexColCenter">
                  <div className="blogsHed">
                    <h3>{username}'s Blogs :</h3>
                  </div>
                  {
                    userBlogs.map((blog)=>{
                      const {_id,photo,title,dsc,userPp,username}=blog;
                      return( 
                          <div className='blog borderRadHalf bgBlack  textCenter mgT1 pd3' key={_id}>
                              <Link to={`/user/${username}`} className=' textDecorNone colorBlack'>
                                  <div className="blogUserInfo">
                                    <img src={userPp} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
                                    <p className=' fontSm fontItalic fontBold1 fontCourier'>{username}</p>
                                  </div>
                              </Link>
                              <img src={`/blogImages/${photo}`} alt="blogImage" className=' width50'/>
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

export default SingleUser;

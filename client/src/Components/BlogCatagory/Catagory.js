import React, { useEffect, useState } from 'react';
import './catagory.css';
import {Link, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../footer/Footer';

const Catagory= () => {
    const [isloadding,setIsloadding]=useState(true);
    const {blogCatagory}=useParams();

    const [catasBlogs,setCatasBlog]=useState([]);
    const [pUser,setPUser]=useState({});

    const pUserFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setPUser(res);
            setIsloadding(false);
          };
        });
      };
    const cataBlogFetch= async (blogCatagory) => {
        await fetch(`/api/blog/catagoryWaysBlog/${blogCatagory}`)
        .then((res)=>res.json())
        .then((res)=>{
            setCatasBlog(res);
          if (res) {
            setIsloadding(false);
          }
        }).catch((err)=>alert(err.message));
    };

    useEffect(() => {
        cataBlogFetch(blogCatagory);
        pUserFetch()
    }, [blogCatagory]);
    

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
            setIsloadding(false);
            alert(res.message);
            window.location.href='/';
          }
        });
  };


    // console.log(catasBlogs);
    return (
      <>
      
      <div className=' catagory flexColCenter pad2'>
            {
                isloadding===true? 
                <div className="loder">
                    <div className="ring"></div> 
                </div>
                :<>
                    {
                        catasBlogs.length===0 ? <h1 className=' height100VH'> No one find Blogs On {blogCatagory.toUpperCase()} catagory</h1>
                        :<>
                        <h1>{blogCatagory.toUpperCase()} catagory's Blogs </h1>
                        {
                            catasBlogs.map((blog)=>{
                                const {_id,photo,title,dsc,userPp,username}=blog;
                                return( 
                                  <div className='blog borderRadHalf bgBlack width50 textCenter mgT1 pd3' key={_id}>
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
                                          <button><Link to={`/blog/${_id}/eidt-your-blog`} style={{color:'white'}}><FontAwesomeIcon icon={faPencilAlt}/></Link></button>
                                          <button onClick={()=>handleDeleteBlog(_id)}><FontAwesomeIcon icon={faTrash}/></button>
                                       </div>:''
                                      }
                                   </div>
                                    <img src={`/blogImages/${photo}`} alt="blogImage" className=' width50'/>
                                    <h2>{title}</h2>
                                    <p>{dsc.slice(0,200)} <Link to={`/blog_details/${_id}`} className='DtLink'>.....</Link> </p>
                                  </div>
                                );
                            })
                        }
                         </>
                    }
                   
                </>
            }
        </div>
       <footer><Footer/></footer>
      </>
    );
};

export default Catagory;

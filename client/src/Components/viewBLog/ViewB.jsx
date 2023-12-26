import React, { useEffect, useState } from 'react';
import './view.css';
import { useParams } from 'react-router-dom';
import Comment from './Comment/Comment';

function BlogDetails() {
    const [isloadding,setIsloadding]=useState(true);
    const {blogId}=useParams();


    const [blog,setBlog]=useState({});

    const fetchBlog= async (blogId) => {
        await fetch(`/api/blog/singleBlog/${blogId}`)
        .then((res)=>res.json())
        .then((res)=>{
            setBlog(res);
          if (res) {
            setIsloadding(false);
          }
        }).catch((err)=>alert(err.message));
    };

    useEffect(() => {
      fetchBlog(blogId);
    }, [blogId]);

    const {catagory,photo,title,dsc,userPp,username}=blog;
    return (
        <div className='blogDetail'>
            {
              isloadding===true?<h1>Loadding...</h1>
              :
              <>
                <div className='detailCont flexCol textCenter'>
                  <div className="userInfo flexRowAiCenter">
                    <img src={userPp} alt="userProfile" className=' width1s' />
                    <div className=' mgRHalf'>
                      <p>Posted by {username}</p>
                      <p>{catagory.toLocaleUpperCase()} Story</p>
                    </div>
                  </div>
                  <img src={userPp} alt="blogpicture" className='blogImg' />
                  <h1> {title}</h1>
                  <p className='dsc'>{dsc}</p>
                </div><hr />
              </>
            } 
            
            {/* <Comment blogId={blogId}/> */}
        </div>
    );
};

export default BlogDetails;

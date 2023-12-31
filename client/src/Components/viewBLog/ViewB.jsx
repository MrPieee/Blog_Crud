import React, { useEffect, useState } from 'react';
import './view.css';
import { Link, useParams } from 'react-router-dom';
import Comment from './Comment/Comment';
import { Footer } from '../footer/Footer';

function BlogDetails() {
    const [isloadding,setIsloadding]=useState(true);
    const {blogId}=useParams();


    const [blog,setBlog]=useState({});
    const [catablog,setCataBlog]=useState([]);

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


    const cataBlogFetch= async (blogCatagory) => {
      await fetch(`/api/blog/catagoryWaysBlog/${blogCatagory}`)
      .then((res)=>res.json())
      .then((res)=>{
        setCataBlog(res);
        if (res) {
          setIsloadding(false);
        }
      }).catch((err)=>alert(err.message));
  };


    useEffect(() => {
      fetchBlog(blogId);
      cataBlogFetch(blog.catagory);
    }, [blogId,blog.catagory]);

    const {catagory,photo,title,dsc,userPp,username}=blog;
    return (
        <div className='blogDetail'>
            {
              isloadding===true?
              <div className="loder">
                  <div className="ring"></div> 
              </div>
              :
              <>
                <div className='detailCont flexCol textCenter'>
                  <div className="userInfo flexRowAiCenter">
                    <img src={userPp==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?userPp:`/userProfile/${userPp}`} alt="userProfile" className=' width1s' />
                    <div className=' mgRHalf'>
                      <p>Posted by {username}</p>
                      <p>{catagory} blog</p>
                    </div>
                  </div>
                  <img src={`/blogImages/${photo}`} alt="blogpicture" className='blogImg' />
                  <h1> {title}</h1>
                  <p className='dsc'>{dsc}</p>
                </div><hr />

                  <Comment blogId={blogId} blogUsername={username}/>
                  
                   <div className="VBlgOthers flexColCenter">
                    <h3 id='smCatHd'>{catagory} catagory's others blog</h3>
                      <div className="samecataBolg">
                          {
                              catablog.slice(0,6).map((blogg)=>{
                                const {_id,title,photo}=blogg;
                                return(
                                  <Link to={`/blog_details/${_id}`} style={{color:'white'}}>
                                      <div className="blg">
                                          <img src={`/blogImages/${photo}`} alt="" />
                                          <p>{title}</p>
                                      </div>
                                  </Link>
                                )
                              })
                            }
                      </div>
                    <h2><a href={`/catagory/${catagory}`}>---see all ---{'>'}</a></h2>
                    </div>   


                  <footer><Footer/></footer>
              </>
            } 
            
        </div>
    );
};

export default BlogDetails;

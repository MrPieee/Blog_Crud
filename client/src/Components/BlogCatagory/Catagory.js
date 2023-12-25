import React, { useEffect, useState } from 'react';
import './catagory.css';
import {Link, useParams} from 'react-router-dom';

const Catagory= () => {
    const [isloadding,setIsloadding]=useState(true);
    const {blogCatagory}=useParams();

    const [catasBlogs,setCatasBlog]=useState([]);

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
    }, [blogCatagory]);
    
    console.log(catasBlogs);
    return (
        <div className=' catagory flexColCenter pad2'>
            {
                isloadding===true? <h1>Loadding....</h1>
                :<>
                    {
                        catasBlogs.length===0 ? <h1> No one find Blogs On {blogCatagory.toUpperCase()} catagory</h1>
                        :<>
                        <h1>{blogCatagory.toUpperCase()} Story's Blogs </h1>
                        {
                            catasBlogs.map((blog)=>{
                                const {_id,catagory,photo,title,dsc,userPp,username}=blog;
                                return( 
                                  <div className='blog border2 borderRadHalf bgWhite width50 textCenter mgT1 pd3' key={_id}>
                                    <div className="blogUserInfo">
                                        <img src={userPp} alt="userprofile" className=' width1 borderRad2 mgRHalf'/>
                                        <p className=' fontSm fontItalic fontBold1 fontCourier'>{username}</p>
                                    </div>
                                    <img src={userPp} alt="userprofile" className=' width50'/>
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
    );
};

export default Catagory;

import React, { useEffect, useState } from 'react';
import './cmntC.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faClose } from '@fortawesome/free-solid-svg-icons';

export const CmntCntrl = (props) => {
  const [userComments,setUserComments]=useState([]);

  const username=props.username;
  const handleController=props.handleController;
  const userBlogFetch=async(username)=>{
    await fetch(`/api/comment/userComments/${username}`)
    .then((res)=>res.json())
    .then((res)=>{
      if (res) {
        setUserComments(res);
        console.log(res);
      };
    });
  };
  useEffect(() => {
      userBlogFetch(username);
  }, [username]);

  const handleDeleteComments=async(username)=>{
    await fetch(`/api/comment/deleteUserComments/${username}`,{method:"DELETE"})
      .then((res)=>res.json())
      .then((res)=>{
        if(res){
          alert(res.message);
          document.querySelector('.cpopup').style.display='none';
          setUserComments([]);
        }
      }).catch((err)=>{ alert(err.message)});
  }

  return (
    <div>
        <button onClick={()=>handleController('commentController')} className='colorWhite fontMd borderNone bgNone ' style={{cursor:'pointer'}}><FontAwesomeIcon icon={faArrowCircleLeft}/></button>
        <div className="cmntCntrl flexColCenter">
            <div className="deleteBlogbtn">
                  {
                    userComments.length>=1
                    ?<button className='bgDanger borderRad3 fontMd  borderNone pd2 mg2'onClick={()=>{
                      document.querySelector('.cpopup').style.display='flex';
                    }} style={{cursor:'revert'}}>Delete All Comment</button>:''
                  }
            </div>
            <div className="userComments">
              {
               userComments.length===0
               ?<h1 className=' fontL fontItalic  colorYellow textCenter fontCourier'>You don't have commented on any blogs.!!</h1>
               :userComments.map((comnt)=>{
                const {_id,comment}=comnt;
                return( 
                    <div className='comment' key={_id}>
                        <p>{comment}</p>
                    </div>
                  );
                })

              }
            </div>
        </div>

        <div className="cpopup">
            <div className="cpoCont">
              <div className=' mg2'>
                  <button className='  colorWhite fontMd borderNone bgNone' onClick={()=>{
                    document.querySelector('.cpopup').style.display='none';
                  }}><FontAwesomeIcon icon={faClose}/></button>
              </div>
              <h3>Are you sure your want to delete your all Comments from any blogs..!?</h3>
                    <button onClick={()=>handleDeleteComments(username)} className=' bgDanger borderRad3 fontMd  borderNone pd2 mg2'>Yes,Delete.!</button>
            </div>
        </div>
    </div>
  );
};

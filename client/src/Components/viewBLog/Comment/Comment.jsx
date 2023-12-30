import React, { useContext, useEffect, useState } from 'react';
import './comment.css';
import { LogInContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Comment(props) {

    const [loginAuth]=useContext(LogInContext);

    const blogId=props.blogId;
    const blogUsername=props.blogUsername;
    // console.log(blogId)
    const [user,setUser]=useState(null);
    
    let [comments,setComments]=useState([]);

    const [commnetInp,setCommentInp]=useState('');
   
    const [newComment,setNewComment]=useState(null);

    const userFetch=async(loginAuth)=>{
      if (loginAuth===true) {
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setUser(res);
          }
        })
      };
    };

    
    const commentFetch=async(blogId)=>{
          await fetch(`/api/comment/blogcomments/${blogId}`)
          .then((res)=>res.json())
          .then((res)=>{
            if (res) {
                setComments(res);
            }
          });
      };
  
   
   useEffect(() => {
    userFetch(loginAuth);
    commentFetch(blogId);
   },[loginAuth,blogId]);

    const handleAddComment=async()=>{
        await fetch('/api/comment/commentPost',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                blogId:blogId,
                username:user.username,
                userProfile:user.profilePic,
                comment:commnetInp
            })
        }).then((res)=>res.json())
          .then((res)=>{
            setNewComment(res.comment);
          }).catch((err)=>{
            console.log(err);
          });
    };


    const handleDeleteComment1=async(commentId)=>{
        await fetch(`/api/comment/delete/${commentId}`,{
           method:"DELETE",
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify({
            username:user.username
          })
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.message==='This comment has been deleted'){
                setNewComment(null);
            }
        }).catch((error)=>alert(error.message));
    };

    
    const handleDeleteComment2=async(commentId)=>{
        await fetch(`/api/comment/delete/${commentId}`,{
           method:"DELETE",
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify({
            username:user.username
          })
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.message==='This comment has been deleted'){
                comments=comments.filter((cmnt)=>cmnt._id!==commentId);
                setComments(comments);
            }
        }).catch((error)=>alert(error.message));
    };

    return (
        <div className='comment'>
            <h1>Comments:-</h1>
             <div className="comntCont">
                {
                    loginAuth===true
                    ?<form onSubmit={(e)=>e.preventDefault()} className=' flexRowCenter'>
                        <textarea onChange={(e)=>{
                            const value=e.target.value.trim();
                            if (value.length<=150 && value.length >=20) {
                                setCommentInp(value);
                            }
                        }} type="text" name="comment" id="comment" placeholder='Add your comment...'></textarea>
                        <button onClick={handleAddComment} disabled={commnetInp.length >=20?'':'disabled'} type="submit">ADD</button>
                    </form>
                    : <h3>Login or signup for do the comment.</h3>
                }
             </div>
             <div className="commentShow">
                {
                    newComment
                    ?<div className="newCmnt">
                        <div className=" flexRowAiCenter">
                        <img src={newComment.userPp.slice(0,5)==='https'?newComment.userPp:`/userProfile/${newComment.userPp}`} alt="userProfile" />
                        <p>{newComment.comment}</p>
                        </div>
                        <div className="tras">
                            <button onClick={()=>handleDeleteComment1(newComment._id)}  className=' colorDanger bgNone borderNone bgEsh borderR3 fontSMd'><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </div>:' '
                }
                {
                    comments?comments.map((cmnt)=>{
                        const {_id,comment,userPp,commentUsername}=cmnt;
                        return(
                         <div className='blogComments' key={_id}>
                             <div className=" flexRowAiCenter">
                                <img src={userPp.slice(0,5)==='https'?userPp:`/userProfile/${userPp}`} alt="userProfile" />
                                <p>{comment}</p>
                             </div>
                            {
                                commentUsername===user.username || user.username ===blogUsername? 
                                <div className="tras">
                                    <button onClick={()=>handleDeleteComment2(_id)} className=' colorDanger bgNone borderNone bgEsh borderR3     fontSMd'><FontAwesomeIcon icon={faTrash}/></button>
                                </div>:''
                            }
                         </div>
                        );
                    }):''
                }
             </div>
        </div>
    );
};

export default Comment;

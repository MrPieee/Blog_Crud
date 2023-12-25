import React from 'react';
import './comment.css';

function Comment(props) {
    return (
        <div className='comment'>
            <h1>Comments:-</h1>
             <div className="comntCont">
               <h1>{props.blogId}</h1>
             </div>
        </div>
    );
};

export default Comment;

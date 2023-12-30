import React from 'react';
import './accCnt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
export const AcContrl = (props) => {
    const user=props.user;
    const {_id,name,username,profilePic}=user;
  return (
    <div>
        <div>
            <button className='  colorWhite fontMd borderNone bgNone'><FontAwesomeIcon icon={faArrowCircleLeft}/></button>
        </div>
        <div id="profileInfo" className=' flexColCenter'>
                <img src={profilePic==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?profilePic:`/userProfile/${profilePic}`} alt="profile" />
                <div className=" flexRowAiCenter">
                  <h3>{name}</h3>
                  <h4>@{username}</h4>
                </div><hr />
                <button className=' bgDanger borderRad3 fontMd  borderNone pd2 mg2'>Delete Your Account</button>
        </div>
    </div>
  );
};

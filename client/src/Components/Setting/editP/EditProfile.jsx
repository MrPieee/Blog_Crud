import React, { useEffect, useState } from 'react';
import './editP.css';
import { usernameValid } from '../../validation/validation';
// import {useNavigate} from 'react-router-dom';
const EditProfile=()=> {

  // const navigate =useNavigate();

      const [isLoading,setIsLoading]=useState(true);

      const [allUsers,setAllUsers]=useState([]);

      const [error,setError]=useState({
        message:''
      });
      const [username,setUsername]=useState('');
      const [userId,setUserId]=useState('');
      const [userPp,setUserPp]=useState('');
      const [nameInp,setNameInp]=useState('');
      const [image, setImage] = useState('');
      const [imageFile, setImageFile] = useState(null);
 
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
          const reader = new FileReader();
 
          reader.onload = (e) => {
            // Set the image data to be displayed
            setImage(e.target.result);
          };
 
          // Read the selected file as a data URL
          reader.readAsDataURL(file);
        }
      };

      const AllUserFetch=async()=>{
        await fetch('/api/users')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setAllUsers(res);
            setIsLoading(false);
          };
        });
      };

      const userFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setUserId(res._id);
            setNameInp(res.name);
            setUsername(res.username);
            setUserPp(res.profilePic)
            setIsLoading(false);
          };
        });
      };
    
      useEffect(() => {
        AllUserFetch();
        userFetch();
      }, []);
      


      const handleUpdateWithOutPics=async(userId)=>{
        if(nameInp && username){
          if (allUsers.find((user)=>user.username===username)) {
            setError({
              message:'Username already exist'
            });
          }else{
            setError({
              message:''
            });
            await fetch(`/api/user/updateData/${userId}`,{
              method:'PATCH',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                name:nameInp,
                username:username
              })
            })
            .then((res)=>res.json())
            .then((res)=>{
              if (res) {
                  alert(res.message);
                  window.location.href='/Profile';
              };
            });
          };
        };
      };

      const formData = new FormData();
      formData.append('name', nameInp);
      formData.append('username', username);
      formData.append('proflePhoto', imageFile);

      const handleUpdateWithPics=async(userId)=>{
        if(formData){
          if (allUsers.find((user)=>user.username===username)) {
            setError({
              message:'Username already exist'
            });
          }else{
            setError({
              message:''
            });
              await fetch(`/api/user/updateDataWithProfile/${userId}`,{
                method:'PATCH',
                body:formData
              })
              .then((res)=>res.json())
              .then((res)=>{
                if (res.status===201) {
                    alert(res.message);
                    window.location.href='/Profile';
                };
              });
            };
          };
      };


    return (
        <div className='editdP flexColCenter'>
            {
                isLoading?
                <div className="loder">
                    <div className="ring"></div> 
                </div>
                :
                <div className="editForm">
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  setError(usernameValid({username:username,name:nameInp}));
                }}>
                  <div className='profileImg'>
                     <img src={image ? image 
                        :userPp==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?userPp 
                        :`/userProfile/${userPp}`} alt="userImg"/>
                     <input type="file" className='profileImgInp' name='blogPhoto' onChange={handleImageChange} accept="image/*" />
                   </div>
                   <div className='name'>
                      <input type="text" name="name"  value={nameInp} onChange={(e)=>{
                         const value = e.target.value.trim();
                         if (value.length <= 21 || value.length > 7 ) {
                         setNameInp(value);
                         }
                     }} />
                     <input type="text" name="username"  value={username} onChange={(e)=>{
                         const value = e.target.value.trim();
                         if (value.length <= 21 || value.length > 7 ) {
                         setUsername(value);
                         }}} onKeyDownCapture={()=>{
                          if(allUsers.find((user)=>user.username===username)){
                            setError({
                              message:'Username already exist'
                            });
                          }else{
                            setError({
                              message:''
                            });
                          }
                         }}/>
                     <p className='colorDanger' >{error.message}</p>
                   </div>
                   
                   <div className="UpBtn">
                    {
                      image
                      ?<button id='updateBtn' onClick={()=>handleUpdateWithPics(userId)} >Update</button>
                      :<button id='updateBtn' onClick={()=>handleUpdateWithOutPics(userId)} >Update</button>
                    }
                   </div>
                </form>
            </div>
            }
        </div>
    );
};

export default EditProfile;

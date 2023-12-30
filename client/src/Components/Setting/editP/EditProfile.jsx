import React, { useEffect, useState } from 'react';
import './editP.css';
import {useNavigate} from 'react-router-dom';
const EditProfile=()=> {

  const navigate =useNavigate();

      const [isLoading,setIsLoading]=useState(true);

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
      
      const userFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setUserId(res._id);
            setNameInp(res.name);
            setUserPp(res.profilePic)
            setIsLoading(false);
          };
        });
      };
    
      useEffect(() => {
        userFetch();
      }, []);
      


      const handleUpdateWithOutPics=async(userId)=>{
        if(nameInp){
          await fetch(`/api/user/updateData/${userId}`,{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:nameInp,
             })
          })
          .then((res)=>res.json())
          .then((res)=>{
            if (res) {
                alert(res.message);
                navigate('/Profile',{
                  replace:true
                });
            };
          });
        };
      };

      const formData = new FormData();
      formData.append('name', nameInp);
      formData.append('proflePhoto', imageFile);

      const handleUpdateWithPics=async(userId)=>{
         if(formData){
          await fetch(`/api/user/updateDataWithProfile/${userId}`,{
            method:'PATCH',
            body:formData
          })
          .then((res)=>res.json())
          .then((res)=>{
            if (res.status===201) {
                alert(res.message);
                navigate('/Profile',{
                  replace:true
                });
            };
          });
         };
      };


    return (
        <div className='editdP flexColCenter'>
            {
                isLoading?<h1>Loading..</h1>
                :
                <div className="editForm">
                <form onSubmit={(e)=>e.preventDefault()}>
                  <div className='profileImg'>
                     <img src={image ? image 
                        :userPp==='https://i.postimg.cc/xCHs0vfR/user2.jpg'?userPp 
                        :`/userProfile/${userPp}`} alt="userImg"/>
                     <input type="file" className='profileImgInp' name='blogPhoto' onChange={handleImageChange} accept="image/*" />
                   </div>
                   <div className='name'>
                      <input type="text" name="name"  value={nameInp} onChange={(e)=>{
                         const value = e.target.value;
                         if (value.length <= 21 || value.length > 7 ) {
                         setNameInp(value);
                         }
                     }} />
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

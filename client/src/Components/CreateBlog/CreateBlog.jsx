import React, { useEffect, useState } from 'react';
import './createblog.css';

function CreateBlog() {

  const [user,setUser]=useState({});

  const userFetch=async()=>{
    await fetch('/api/user/profile')
    .then((res)=>res.json())
    .then((res)=>{
      if (res) {
        setUser(res);
      }
    })
  };

  useEffect(() => {
    userFetch();
  }, [])
  
  const [titleInp, setTittleInp] = useState('');
  const [dscInp, setDscInp] = useState('');
  const [catagory, setCatagroy] = useState('');

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


  const formData = new FormData();
    formData.append('title', titleInp);
    formData.append('dsc', dscInp);
    formData.append('catagory', catagory);
    formData.append('blogPhoto', imageFile);
    formData.append('userId', user._id);
    formData.append('username', user.username);
    formData.append('userProfile', user.profilePic);
  const handleBlogPost=async()=>{
    
      if(titleInp&&dscInp&&catagory&&imageFile&&user){
        await fetch('/api/blog/blogPost',{
          method:"POST",
          body:formData,
        }).then((res)=>res.json())
        .then((res)=>{
          if (res) {
            alert(res.message);
            window.location.href=`/blog_details/${res.id}`
          };
        }).catch((err)=>{
          alert(err.message);
        });
      }
  };

  const [disable,setDisable]=useState(true);

    return (
        <div className='createBlog'>
            <h1>Create Blog</h1>
           <div className="blogFrom">

            <form onSubmit={(e)=>e.preventDefault()} encType="multipart/form-data">
                  
                  <div className="cata" >
                    <select name="catagory" onChange={(e)=>{
                          setCatagroy(e.target.value);
                        }}>
                      <option>Select a Catagory</option>
                      <option value="love">Love</option>
                      <option value="success">Success</option>
                      <option value="sad">Sad</option>
                      <option value="broken">Broken</option>
                      <option value="education">Education</option>
                      <option value="programming">Programming</option>
                      <option value="health">Health</option>
                      <option value="games">Games</option>
                      <option value="natural">Natural</option>
                    </select>
                  </div>

                
                    <div className='img'>
                         <img src={image ? image:'https://i.postimg.cc/kGW9FvCZ/image.png'} alt="rioj"/>
                        <input required type="file" id='imgInp' name='blogPhoto' onChange={handleImageChange} accept="image/*" />
                    </div>
                 
                  <div className=" title flexCol">

                        <textarea required name='title'  value={titleInp} onChange={(e)=>{
                                  const value = e.target.value;
                                  setDisable(true)
                                  if(value.trim().length < 101 && value.trim().length >= 20){
                                    setDisable(false)
                                  }
                                  if (value.length <= 105) {
                                    setTittleInp(value);
                                  }
                          }} style={titleInp.length >= 100 ? {border:"3px solid red"} : {border:"1px solid white"}}
                        ></textarea>
                        <p style={{textAlign:'right'}}>{titleInp.length}/100</p>
                        <p style={{textAlign:'left',color:'yellow'}}>{titleInp.length >= 100 ? 'Title must give Maximum-100 Character ' :'' }</p>
                        <p style={{textAlign:'left',color:'yellow'}}>{titleInp.length < 20 ? 'Title must give Minimum-20 Character ' :'' }</p>
                  </div>

                  <div className="dsc flexCol">
                      <textarea required name='dsc'  value={dscInp} onChange={(e)=>{
                         const value = e.target.value;
                         setDisable(true)
                         if(value.trim().length < 2051 && value.trim().length >= 100){
                          setDisable(false)
                        }
                        if (value.length <= 2060) {
                          setDscInp(value);
                       }
                      }} style={dscInp.length > 2050 ? {border:"3px solid red"} : {border:"1px solid white"}}
                    ></textarea>
                    <p style={{textAlign:'right'}}>{dscInp.length}/2050</p>
                  </div>

                <button id='postBtn' style={disable?{backgroundColor:'rgba(168, 166, 152, 0.658)',color:'rgba(0, 0, 0, 0.281)',cursor:'no-drop'}:{backgroundColor: 'rgb(248, 223, 0)'}} disabled={disable?"disabled":''} onClick={handleBlogPost}>Post</button>
            </form>

           </div>
                
        </div>
    );
    
};

export default CreateBlog;

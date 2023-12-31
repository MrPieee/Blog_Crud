import React, { useEffect, useState } from 'react';
import './edit.css';
import { useParams } from 'react-router-dom';

function Edit() {
    const [isloadding,setIsloadding]=useState(true);

    const {blogId}=useParams();

    const [titleInp, setTittleInp] = useState('');
    const [dscInp, setDscInp] = useState('');
    const [catagory, setCatagroy] = useState('');
  
    const [oldImage, setOldImage] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null);


    const fetchBlog= async (blogId) => {
        await fetch(`/api/blog/singleBlog/${blogId}`)
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setTittleInp(res.title);
            setDscInp(res.dsc);
            setCatagroy(res.catagory);
            setOldImage(res.photo);
            setIsloadding(false);
          }
        }).catch((err)=>alert(err.message));
    };

    useEffect(() => {
        fetchBlog(blogId);
      }, [blogId]);
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setOldImage('');
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


  const formData1 = new FormData();
    formData1.append('title', titleInp);
    formData1.append('dsc', dscInp);
    formData1.append('catagory', catagory);
    formData1.append('blogPhoto', imageFile);

  const handleBlogUpadte1=async()=>{
    
      if(titleInp||dscInp||catagory||imageFile){
        await fetch(`/api/blog/updateI/${blogId}`,{
          method:"PUT",
          body:formData1,
        }).then((res)=>res.json())
        .then((res)=>{
          if (res) {
            alert(res.message);
            window.location.href=`/blog_details/${blogId}`
          };
        }).catch((err)=>{
          alert(err.message);
        });
      }
  };

  const formData2 = new FormData();
  formData2.append('title', titleInp);
  formData2.append('dsc', dscInp);
  formData2.append('catagory', catagory);

  const handleBlogUpadte2=async()=>{
    
        if(titleInp||dscInp||catagory){
        await fetch(`/api/blog/updateO/${blogId}`,{
            method:"PUT",
            body:formData2,
        }).then((res)=>res.json())
        .then((res)=>{
            if (res) {
            alert(res.message);
            window.location.href=`/blog_details/${blogId}`
            };
        }).catch((err)=>{
            alert(err.message);
        });
        }
    };

    const [disable,setDisable]=useState(true);

    return (
        <div className='edit'>
               <h1>Edit Blog</h1>
             {
                 isloadding===true
                 ?<h1>Loading...</h1>
                 :
                 <div className="blogFrom">

                    <form onSubmit={(e)=>e.preventDefault()} encType="multipart/form-data">
                        
                        <div className="cata" >
                            <select name="catagory" onChange={(e)=>{
                                setCatagroy(e.target.value);
                                }} value={catagory}>
                            <option>Select a Catagory</option>
                            <option value="love">Love</option>
                            <option value="success">Success</option>
                            <option value="education">Education</option>
                            <option value="programming">Programming</option>
                            <option value="romantic">Romantic</option>
                            <option value="sad">Sad</option>
                            <option value="broken">Broken</option>
                            <option value="thriller">Thriller</option>
                            <option value="health">Health</option>
                            <option value="games">Games</option>
                            <option value="natural">Natural</option>
                            </select>
                        </div>
        
                        
                            <div className='img'>
                                <img src={ oldImage?`/blogImages/${oldImage}` :image} alt="rioj"/>
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
        
                        {
                            image
                            ?<button id='postBtn' style={disable?{backgroundColor:'rgba(168, 166, 152, 0.658)',color:'rgba(0, 0, 0, 0.281)',cursor:'no-drop'}:{backgroundColor: 'rgb(248, 223, 0)'}} disabled={disable?"disabled":''} onClick={handleBlogUpadte1}>Update</button>
                            :<button id='postBtn' style={disable?{backgroundColor:'rgba(168, 166, 152, 0.658)',color:'rgba(0, 0, 0, 0.281)',cursor:'no-drop'}:{backgroundColor: 'rgb(248, 223, 0)'}} disabled={disable?"disabled":''} onClick={handleBlogUpadte2}>Update</button>
                        }
                    </form>
     
                </div>
             }
        </div>
    );
};

export default Edit

import React, { useEffect, useState } from 'react';
import './secure.css';

const Security=()=> {


      const [isLoading,setIsLoading]=useState(true);
      const [pUSer,setPUSer]=useState({});

      const [pass1,setPass1]=useState('');
      const [pass2,setPass2]=useState('');
      const [pass3,setPass3]=useState('');
      const [error,setError]=useState('');

    const userFetch=async()=>{
        await fetch('/api/user/profile')
        .then((res)=>res.json())
        .then((res)=>{
          if (res) {
            setPUSer(res);
            setIsLoading(false);
          };
        });
      };

      useEffect(() => {
        userFetch();
      }, []);
      
      const [disable,setDisable]=useState(true);
      const handlePassword=async(userId)=>{
        
        if(pass1 && pass2===pass3){
            await fetch(`/api/user/updatePass/${userId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    oldPass:pass1,
                    newPass:pass3
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                if (res.status===404) {
                    setError(res.message);
                }else{
                    setIsLoading(false);
                    alert(res.message);
                    setPass1('')
                    setPass2('')
                    setPass3('')
                };
            }).catch((err)=>alert(err.message));
        } else if(pass2===pass3 && !pass1){
            setError('');
            await fetch(`/api/user/updatePass/${userId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password:pass3
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                if (res.status===404) {
                    setError(res.message);
                }else{
                    setIsLoading(false);
                    alert(res.message);
                    setIsLoading(false);
                    alert(res.message);
                    setPass1('')
                    setPass2('')
                    setPass3('')
                };
            }).catch((err)=>alert(error.message));
        }else{
            setDisable(true);
            setError('New password does not match. Enter new password again here.');
        }
      };



    return (
        <div className='secure flexColCenter'>
                <div className="passwordChangeForm flexColCenter">
                    {
                        isLoading===true? 
                        <div className="loder">
                            <div className="ring"></div> 
                        </div>
                        :<form onSubmit={(e)=>e.preventDefault()}>

                        {
                            pUSer.password ? 
                            <input type="password" name="password" placeholder='Give your current password' 
                             value={pass1} onChange={(e)=>{
                                setDisable(true);
                                setError('');
                                const value = e.target.value.trim();
                                if (value.length <= 21 || value.length > 4 ) {
                                   setPass1(value);
                                   if (pass2.trim() && pass3.trim() && pass2.trim()===pass3.trim()) {
                                    setDisable(false)
                                  }else{
                                    setDisable(true);
                                  }
                                }else{
                                    setDisable(true);
                                }
                        }}  onMouseUp={(e)=>e.target.type="text"} onMouseOut={(e)=>e.target.type="password"} />
                           :''
                        }
    
                        <input type="password" name="password" placeholder='Set a new strong password'  
                        value={pass2} onChange={(e)=>{
                             setDisable(true);
                             const value = e.target.value;
                             if (value.length <= 21 || value.length > 5 ) {
                                setPass2(value);
                                setDisable(false);
                              }
                        }}  onMouseUp={(e)=>e.target.type="text"} onMouseOut={(e)=>e.target.type="password"} />
                        
                        <input type="password" name="password" placeholder='Re-type the password' value={pass3} onChange={(e)=>{
                                   setDisable(true);
                                   setError('');
                                   const value = e.target.value.trim();
                             if (value.length <= 21 || value.length > 5 ) {
                                setPass3(value);
                                if(pass2.trim()===pass3.trim()){
                                    setError('');
                                    setDisable(false);
                                }else{
                                    setError('New password does not match. Enter new password again here.');
                                    setDisable(true);
                                }
                              }
                        }}  onMouseUp={(e)=>e.target.type="text"} onMouseOut={(e)=>e.target.type="password"} />
                        {
                            error?<p className=' colorDanger'>{error}</p>:''
                        }
    
                            <button id='updateBtn' disabled={disable?'disabled':''}  style={disable?{backgroundColor:'rgba(168, 166, 152, 0.658)',color:'rgba(0, 0, 0, 0.281)',cursor:'no-drop'}:{backgroundColor: 'rgb(0, 178, 248)'}}
                            onClick={()=>handlePassword(pUSer._id)}>{pUSer.password ?'Update Password':'Set Password'} </button>
    
                        </form>
                    }
                </div>
        </div>
    );
};

export default Security;

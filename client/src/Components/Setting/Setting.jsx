import React from 'react';
import'./setting.css';
import { Link,Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
// import EditProfile from './editP/EditProfile';


const Setting = () => {

  
  return (
    <div className='setting'>

       <div className="settingNav">
            <button onClick={()=>{
              document.querySelector('.settingNav').style.display='none';
            }} className='  colorDanger fontMd borderNone bgNone ' id='navBtns'><FontAwesomeIcon icon={faClose}/> </button>
          <nav className="settingNavber">
              <Link className=' textDecorNone' to={`/setting/account/editProfile`} > <button>EditProfile</button> </Link>
              <Link className=' textDecorNone' to={"/setting/account/Security"}> <button>Password&Security</button> </Link>
              <Link className=' textDecorNone' to={"/setting/account/Controll"}><button>Controll</button> </Link>
          </nav>
       </div><hr />
       <div className="settingOther">
        <button  onClick={()=>{
              document.querySelector('.settingNav').style.display='flex';
            }}  className='colorWhite fontMd borderNone bgNone' id='navBtns'><FontAwesomeIcon icon={faBars}/></button>
          <Outlet/>
       </div>
    </div>
  );
};

export default Setting;
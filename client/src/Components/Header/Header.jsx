import React, { useState } from 'react';
import './header.css';
import {Link} from'react-router-dom';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import { faBars, faClose, faMagnifyingGlass} from'@fortawesome/free-solid-svg-icons';

const Header = () => {

  const [dropOpen,setDropOpen]=useState(false);
 console.log(dropOpen);



  return (
    <div className='header pd1 bgWhite flexRowSpaceBtwn borderB2'>
        <Link style={{textDecoration:'none'}} to={'/'}>
        <div className="logo bgWhite">
          <h1 className='border3 borderRad2 bgPrimary colorYellow textCenter width2 fontItalic'>
            <span className='logo1'>DevBlogs</span>
            <span className='logo2'>DB</span>
            </h1>
        </div>
        </Link>
        <div className="nav width80 flexRowSpaceBtwn">
          <form className=' pd1 borderRad3 flexRowSpaceBtwn navSearch' onSubmit={(e)=>e.preventDefault()}>
                <input className='width2s borderNone bgNone fontSm fontLighter fontCambria colorBlack' type="text" name='search' placeholder='Search On DevBlog'/>
                <button id='searchBtn'><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
              </form>
            <nav className='flexRowCenter navber'>
              <div className='pad2 CloseNav'>
                <button  className='CloseNavBtn' onClick={()=>{
                document.querySelector('.navber').style.display='none';
                document.getElementById('OpenNavBtn').style.display='block';
                // console.log(`first`)
              }}><FontAwesomeIcon icon={faClose}/></button> 
              </div>
              <ul className='flexRow bgWhite'style={{listStyle:"none"}}>
                    <Link to={'/'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">Home</li>
                    </Link>
                      <li>
                        <div className="catagroyDrop">
                          <button onClick={()=>{
                            setDropOpen(!dropOpen);
                          }}>Catagory {dropOpen===true ?<FontAwesomeIcon icon={faClose}/>:'>'} </button>
                           {
                            dropOpen===true?
                            <>
                             <ul className='flexColCenter dropUL'  style={{listStyle:"none"}}>
                             <Link to={'/catagory/love'} className='textDecorNone bgWhite navLink'>
                               <li>Love Story</li>
                             </Link>
                             <Link to={'/catagory/sad'} className='textDecorNone bgWhite navLink'>
                               <li>Sad Story</li>
                             </Link>
                             <Link to={'/catagory/broken'} className='textDecorNone bgWhite navLink'>
                               <li>Broken Story</li>
                             </Link>
                             <Link to={'/catagory/success'} className='textDecorNone bgWhite navLink'>
                               <li>Success Story</li>
                             </Link>
                              <Link to={'/catagory/thriller'} className='textDecorNone bgWhite navLink'>
                               <li>Thriller Story</li>
                              </Link>
                            </ul>
                            </>:''
                           }
                        </div>
                      </li>
                    <Link to={'/create-and-post-a-blog'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">Create-Blog</li>
                    </Link>
                    <Link to={'/Profile'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">Profile</li>
                    </Link>
                    <Link to={'/About'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">AboutUs</li>
                    </Link>
              </ul>
              <div className="logOut">
                <button id='logBtn'>LogIn</button>
              </div>
            </nav>
            <div id='OpenNav'><button id='OpenNavBtn' onClick={()=>{
              document.querySelector('.navber').style.display='flex';
              document.getElementById('OpenNavBtn').style.display='none';
            }}><FontAwesomeIcon icon={faBars} /></button></div>
        </div>
    </div>
  );
};

export default Header;
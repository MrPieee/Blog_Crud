import React, { useContext, useState } from 'react';
import './header.css';
import {Link} from'react-router-dom';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import { faBars, faClose, faMagnifyingGlass} from'@fortawesome/free-solid-svg-icons';
import { LogInContext } from '../../App';

const Header = () => {
  const [loginAuth]=useContext(LogInContext);

  const [catDropOpen,setCatDropOpen]=useState(false);
  const [settingDropOpen,setSettingDropOpen]=useState(false);
//  console.log(dropOpen);

  const handleLogOut=async () => {
    await fetch('/api/user/logOut',{method:"POST"})
      .then((res)=>res.json())
      .then((res)=>{
        if(res){
          alert(res.message);
          window.location.href='/login';
        }
      });
  };


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
                            setCatDropOpen(!catDropOpen);
                          }}>Catagory {catDropOpen===true ?<FontAwesomeIcon icon={faClose}/>:'>'} </button>
                           {
                            catDropOpen===true?
                            <>
                             <ul className='flexColCenter dropUL'  style={{listStyle:"none"}}>
                             <Link to={'/catagory/love'} className='textDecorNone bgWhite navLink'>
                                  <li>Love Story</li>
                                </Link> 
                                <Link to={'/catagory/romantic'} className='textDecorNone bgWhite navLink'>
                                  <li>Romantic Story</li>
                                </Link>
                               
                                <Link to={'/catagory/success'} className='textDecorNone bgWhite navLink'>
                                  <li>Success Story</li>
                                </Link>
                                  <Link to={'/catagory/thriller'} className='textDecorNone bgWhite navLink'>
                                  <li>Thriller Story</li>
                                  </Link>
                                  <Link to={'/catagory/sad'} className='textDecorNone bgWhite navLink'>
                                  <li>Sad Story</li>
                                </Link>
                                <Link to={'/catagory/broken'} className='textDecorNone bgWhite navLink'>
                                  <li>Broken Story</li>
                                </Link> 
                                <Link to={'/catagory/education'} className='textDecorNone bgWhite navLink'>
                                  <li>Education</li>
                                </Link>
                                <Link to={'/catagory/programming'} className='textDecorNone bgWhite navLink'>
                                  <li>Programming</li>
                                </Link> 
                                <Link to={'/catagory/health'} className='textDecorNone bgWhite navLink'>
                                  <li>Health</li>
                                </Link>
                                <Link to={'/catagory/games'} className='textDecorNone bgWhite navLink'>
                                  <li>Games</li>
                                </Link>
                                <Link to={'/catagory/natural'} className='textDecorNone bgWhite navLink'>
                                  <li>Natural</li>
                                </Link>
                            </ul>
                            </>:''
                           }
                        </div>
                      </li>
                    {
                      loginAuth===true?
                      <Link to={'/create-and-post-a-blog'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">Create-Blog</li>
                    </Link>:''
                    }
                    {
                      loginAuth===true?
                      <Link to={'/Profile'} className='textDecorNone bgWhite navLink'>
                      <li className="navList mg1 fontSm colorBlack fontBold1">Profile</li>
                    </Link>:''
                    }
                    
                      <li>
                      <div className="SettingDrop mg1">
                          <button onClick={()=>{
                            setSettingDropOpen(!settingDropOpen);
                          }}>Setting {settingDropOpen===true ?<FontAwesomeIcon icon={faClose}/>:'>'} </button>
                           {
                            settingDropOpen===true?
                            <>
                             <ul className='flexColCenter dropUL'  style={{listStyle:"none"}}>
                                {
                                  loginAuth===true?
                                  <Link to={'/setting/account'} className='textDecorNone bgWhite navLink'>
                                    <li>Account</li>
                                  </Link>:''
                                }
                                <Link to={'/app/terms&condition'} className='textDecorNone bgWhite navLink'>
                                  <li>Trems</li>
                                </Link>
                                <Link to={'/app/about'} className='textDecorNone bgWhite navLink'>
                                  <li>About Us</li>
                                </Link>
                                <Link to={'/app/Privacy&Policy'} className='textDecorNone bgWhite navLink'>
                                  <li>Privacy&Policy</li>
                                </Link>
                                <Link to={'/app/contact'} className='textDecorNone bgWhite navLink'>
                                  <li>CONTACT</li>
                                </Link>
                                <li>
                                {
                                    loginAuth
                                    ?<button onClick={handleLogOut} id='logBtn'>LogOut</button>
                                    :<Link to={'/login'}><button id='logBtn'>LogIn</button></Link>
                                  }
                                </li>
                            </ul>
                            </>:''
                           }
                        </div>
                      </li>
              </ul>
              <div className="logOut">
                
                {
                  loginAuth===false
                  ?<Link to={'/login'}><button id='logBtn'>LogIn</button></Link>
                  :''
                }
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
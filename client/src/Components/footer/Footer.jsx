import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='footer flexRowCenter'>
        
            <div className="footerContainer flexColCenter" >
                <p>
                <Link style={{color:'antiquewhite'}} to="/">DEVBLOGS Community</Link> — A constructive and inclusive social network for software developers. With you every step of your journey.
                </p>

                <ul>
                   <li><Link style={{color:'antiquewhite'}} to="/"> Home</Link></li>
                   {/* <li><Link style={{color:'antiquewhite'}} to="/app/faq"> FAQ </Link> </li> */}
                   <li><Link style={{color:'antiquewhite'}} to={'/catagory/programming'}>Programming</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to={'/catagory/education'}>Education</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to={'/catagory/success'}>Success</Link></li>
                   <li><Link style={{color:'antiquewhite'}}  to={'/catagory/love'}>Love</Link></li>
                   <li><Link style={{color:'antiquewhite'}}  to={'/catagory/health'}>Health</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to="/app/about">About</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to="/app/contact">Contact</Link></li>
                   {/* <li><Link style={{color:'antiquewhite'}} to="/app/guides">Guides</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to="/code-of-conduct">Code of Conduct</Link></li> */}
                   <li><Link style={{color:'antiquewhite'}} to="/app/Privacy&Policy">Privacy Policy</Link></li>
                   <li><Link style={{color:'antiquewhite'}} to="/app/terms&condition">Terms of use</Link></li>
                </ul>
                <div>
                    <h3>DEV Community <span title="copyright">©</span> 2016 - 2023.</h3>
                </div>
            </div>

    </div>
  );
};

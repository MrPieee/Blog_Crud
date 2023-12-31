import React from 'react';
import './contact.css';
import {Footer} from '../footer/Footer';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faLinkedin, faSquareXTwitter, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className='conatct flexColCenter'>
        <h1>Contact</h1>
        <div className="contactCont">
        
            <div className="contactSec1">
            <form onSubmit={(e)=>e.preventDefault()} className='flexColCenter'>  
                <input required type="email" name="email" placeholder='Enter your @mail' />
                <input required type="text" name="subject" placeholder='What the reasion' />
                <textarea required name="Description" placeholder='Type your message here…'></textarea>
                <button>SEND</button>
            </form>
            </div>

            <div className="contactSec2">
                <h1>{'{</>}'}</h1>
                <ul>
                    <Link to={''} className=' colorWhite'>
                        <li><button><FontAwesomeIcon icon={faFacebookSquare}/> </button></li>
                    </Link>
                    <Link to={''} className=' colorWhite'>
                        <li><button><FontAwesomeIcon icon={faSquareXTwitter}/> </button></li>
                    </Link>
                    <Link to={''} className=' colorWhite'>
                        <li><button><FontAwesomeIcon icon={faInstagramSquare}/> </button></li>
                    </Link>
                    <Link to={''} className=' colorWhite'>
                        <li><button><FontAwesomeIcon icon={faLinkedin}/> </button></li>
                    </Link>
                    <Link to={''} className=' colorWhite'>
                        <li><button><FontAwesomeIcon icon={faYoutubeSquare}/> </button></li>
                    </Link>
                </ul>
                <h2>Let's connect with DeVBlogs.io ❤️ ...!!!</h2>
            </div>

        </div>
        <footer><Footer/> </footer>
    </div>
  );
};

import React from 'react';
import './footer.css';

export const Footer = () => {
  return (
    <div className='footer flexRowCenter'>
        
            <div id="footer-container " >
                <p>
                <a  aria-label="DEV Community Home" href="/">DEV Community</a> — A constructive and inclusive social network for software developers. With you every step of your journey.
                </p>

                <ul  style="">
                    <li>
                <a href="/">
                Home
                </a>
                
            </li>
            <li>
                <a href="/pod">
                Podcasts
                </a>
                
            </li>
            <li>
                <a href="/videos">
                Videos
                </a>
                
            </li>
            <li>
                <a href="/tags">
                Tags
                </a>
                
            </li>
            <li>
                <a href="/faq">
                FAQ
                </a>
                
            </li>
            <li>
                <a href="https://shop.forem.com/">
                Forem Shop
                </a>
                
            </li>
            <li>
                <a href="/advertise">
                Advertise on DEV
                </a>
                
            </li>
            <li>
                <a href="/about">
                About
                </a>
                
            </li>
            <li>
                <a href="/contact">
                Contact
                </a>
                
            </li>
            <li>
                <a href="/guides">
                Guides
                </a>
                
            </li>
            <li>
                <a href="/software-comparisons">
                Software comparisons
                </a>
                
            </li>

                </ul>

                <ul className="footer__nav-links flex gap-2 justify-center flex-wrap fs-s p-0" style="">
                    <li>
                <a href="/code-of-conduct">
                Code of Conduct
                </a>
                
            </li>
            <li>
                <a href="/privacy">
                Privacy Policy
                </a>
                
            </li>
            <li>
                <a href="/terms">
                Terms of use
                </a>
                
            </li>

                </ul>

                <div className="fs-s">
                    <p>DEV Community <span title="copyright">©</span> 2016 - 2023.</p>
                </div>
            </div>

    </div>
  );
};

import React from 'react';
import './about.css';
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className='about flexColCenter'>
        
        <div className="aboutCont">
            <div className="ab1">
                    <h1>
                      About DEV
                    </h1>
                  <p>
                  DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.
                  </p>

                  <p>
                  DEV is built on Forem: open source software designed to empower communities. Because our application is open source, you can inspect every little detail of the code, or chip in yourself! Forem is available for anyone interested in creating similar communities in any niche or passion. Visit our meta Forem, forem.dev for more information.
                  </p>

            </div>
            <div className="leader">
                <h1>Leader </h1> 
                  <img src="https://i.postimg.cc/jj5PCbYv/In-Shot-20231022-071739931.jpg" alt="founder" />
                <p>DevBlogs's Founder and Ceo <Link to={'/user/Mr.Pie'}>Mr.Pie</Link></p>
            </div>

            <div className="abEnd">
            <p>We believe in transparency and adding value to the ecosystem. We hope you enjoy poking around and participating!</p>
            <p>Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the software careers of millions.
            </p>
            </div>

          <h3>Happy coding ❤️</h3>

        </div>

    </div>
  );
};

export default About;
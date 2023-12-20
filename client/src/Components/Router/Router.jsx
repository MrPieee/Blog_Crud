import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../profile/Profile';
import About from '../AboutUs/About';
import ViewB from '../viewBLog/ViewB';
const Router = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/blog_details' element={<ViewB/>}/>
       </Routes>        
    </div>
  );
};

export default Router;
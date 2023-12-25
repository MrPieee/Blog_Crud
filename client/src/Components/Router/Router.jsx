import React, { useContext } from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../profile/Profile';
import About from '../AboutUs/About';
import ViewB from '../viewBLog/ViewB';
import Catagory from '../BlogCatagory/Catagory';
import PrivateRoute from './PrivateRoute';
import { LogInContext } from '../../App';
import Login from '../Login/Login';
import CreateBlog from '../CreateBlog/CreateBlog';
import Register from '../Register/Registe';
const Router = () => {
  const [loginAuth]=useContext(LogInContext);

  return (
    
    <div>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/blog_details/:blogId' element={<ViewB/>}/>
          <Route path='/catagory/:blogCatagory' element={<Catagory/>}/>

              {
                loginAuth? ''
                :<Route path={loginAuth?'' :'/login'} element={<Login/>}/>
              }
              {
                loginAuth? ''
                :<Route path={loginAuth?'' :'/register'} element={<Register/>}/>
              }

          <Route path='/*' element={<PrivateRoute/>}>
            <Route path='Profile' element={<Profile/>}/>
            <Route path='create-and-post-a-blog' element={<CreateBlog/>}/>
          </Route>
       </Routes>        
    </div>
  );
};

export default Router;
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
import Terms from '../TermsCondition/Terms';
import SingleUser from '../singleUser/singleUser';
import Edit from '../EditBlog/Edit';
import E404 from '../Error/E404';
import Setting from '../Setting/Setting';
import EditProfile from '../Setting/editP/EditProfile';
import Security from '../Setting/Security/Security';
import { Controll } from '../Setting/Controller/Controller';
import  PrivacyPolicy  from '../PrivacyPolicy/Privacy';
import { Contact } from '../contact/Conctact';
const Router = () => {
  const [loginAuth]=useContext(LogInContext);

  return (
    
    <div>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<E404/>}/>
          <Route path='/app/about' element={<About/>}/>
          <Route path='/app/terms&condition' element={<Terms/>}/>
          <Route path='/app/Privacy&Policy' element={<PrivacyPolicy/>}/>
          <Route path='/app/contact' element={<Contact/>}/>
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
            <Route path='setting/account/*' element={<Setting/>}>
                 <Route path='' element={<EditProfile/>}/>
                 <Route path='editProfile' element={<EditProfile/>}/>
                 <Route path='Security' element={<Security/>}/>
                 <Route path='Controll' element={<Controll/>}/>
            </Route>
            <Route path='user/:sUsername' element={<SingleUser/>}/>
            <Route path='create-and-post-a-blog' element={<CreateBlog/>}/>
            <Route path='blog/:blogId/eidt-your-blog' element={<Edit/>}/>
          </Route>
       </Routes>        
    </div>
  );
};

export default Router;
import React from 'react';
import './e404.css';
import { Footer } from '../footer/Footer';

function E404() {
    return (
        <div className='error flexColCenter'>
             <div className="errU">
                <div className="errCont">
                    <div className="emoji"></div>
                    <div className="e404"></div>
                </div>
                <div className=" flexColCenter mg2">
                    <form onSubmit={(e)=>e.preventDefault()} className='EserchFrom flexRowAiCenter'>
                        <input type="text" name="search" id="serach" placeholder='Search Blog in DevBlogs' />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <button id="goHome" onClick={()=>window.location.href='/'}>Back to home</button>
             </div>
             <div className="errD">
                <footer><Footer/></footer>
             </div>
        </div>
    );
};

export default E404;

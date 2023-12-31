import { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Router from './Components/Router/Router';

export const LogInContext =createContext({});

const App= ()=> {

  const [isLoading,setIsLoading]=useState(true);

    const [logInAuth,setLogInAuth]=useState(false);

    const authFetch=async () => {
      await fetch('/api/auth')
      .then((res)=>res.json())
      .then((res)=>{
        if(res){
          setLogInAuth(res.auth);
          setIsLoading(false);
        }
      });
    };
  
  
    useEffect(() => {
      authFetch();
    },[])

  return (
    <LogInContext.Provider value={[logInAuth,setLogInAuth]}>
      <div className="App flexCol">
          {
            isLoading ===true ? 
            <div className="loder">
                <div className="ring"></div> 
            </div>
            :
            <>
              <Header/>
              <Router/>
            </>
          }
      </div>
    </LogInContext.Provider>
  );
};

export default App;

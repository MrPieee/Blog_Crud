import './App.css';
import Header from './Components/Header/Header';
import Router from './Components/Router/Router';

const App= ()=> {
  return (
    <div className="App flexCol bgEsh">
        <Header/>
        <Router/>
    </div>
  );
}

export default App;

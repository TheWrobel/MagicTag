import './App.css';
import React, {useState} from 'react';
import Login from './components/Login'
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//views
import TagDevicesView from './View/TagDevicesView';
import TagListView from './View/TagListView';

function App() {
  const [loading, setLoading] = useState(false);
  const [loged, setLoged] = useState(false);
  const [headers, setHeaders] = useState({})


  if(!loged) {
    return (
      <div className="App--login content">
      {loading ? <div className="loader"><div className="loader-spiner"/></div> : null} 
        <Login setLoged={setLoged} setLoading={setLoading} setHeaders={setHeaders}/>
      </div>
    )
  }
  return (
    <div className="App content">
    <Router>
      {loading ? <div className="loader"><div className="loader-spiner"/></div> : null} 
      <MyNavbar loged={loged} setLoged={setLoged} setHeaders={setHeaders}/>
      <Route exact path="/" component={() =>(<TagDevicesView headers={headers} setLoading={setLoading}/>)}></Route>
      <Route path="/Tag-List" component={() => (<TagListView headers={headers}/>)}></Route>
    </Router> 
    </div>
  );
}

export default App;

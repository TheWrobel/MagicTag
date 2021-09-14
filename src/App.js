import './App.css';
import React, {useState} from 'react';
import Login from './components/Login'
import MyNavbar from './components/MyNavbar';
//views
import TagDevicesView from './View/TagDevicesView';

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
      <MyNavbar loged={loged} setLoged={setLoged} setHeaders={setHeaders}/>
      <TagDevicesView headers={headers} setHeaders={setHeaders} loading={loading} setLoading={setLoading} loged={loged} setLoged={setLoged}/>
    </div>
  );
}

export default App;

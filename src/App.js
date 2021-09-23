/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import MyNavbar from './components/MyNavbar';
// views
import TagDevicesView from './View/TagDevicesView';
import ListOfTagsView from './View/ListOfTagsView';
import AddNewTagView from './View/AddNewTagView';
import DevicesView from './View/DevicesView';

function App() {
  const [loading, setLoading] = useState(false);
  const [loged, setLoged] = useState(false);
  const [headers, setHeaders] = useState({});

  if (!loged) {
    return (
      <div className="App--login content">
        {loading ? <div className="loader"><div className="loader-spiner" /></div> : null}
        <Login setLoged={setLoged} setLoading={setLoading} setHeaders={setHeaders} />
      </div>
    );
  }
  return (
    <div className="App content">
      <Router>
        <MyNavbar loged={loged} setLoged={setLoged} setHeaders={setHeaders} />
        <Route exact path="/" component={() => (<TagDevicesView headers={headers} setLoading={setLoading} />)} />
        <Route path="/Tag-List" component={() => (<ListOfTagsView headers={headers} />)} />
        <Route path="/New-Tag" component={() => (<AddNewTagView headers={headers} />)} />
        <Route path="/Device-List" component={() => (<DevicesView headers={headers} />)} />
      </Router>
    </div>
  );
}

export default App;

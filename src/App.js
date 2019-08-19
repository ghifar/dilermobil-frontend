import React from 'react';
import logo from './logo.svg';
import './App.css';
import Carlist from './components/Carlist';
import Login from "./components/Login";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

function App() {
  return (
    <div className="App">
      {/*  commented default VALUE. change to use APPBAR and TOOLBAR */}
      {/*<header className="App-header">*/}
      <AppBar position={"static"} color={"default"}>
          <Toolbar>
              Car List
          </Toolbar>
      </AppBar>
        {/*<h1 className="App-tittle">*/}
        {/*  Car List*/}
        {/*</h1>*/}
      {/*</header>*/}

        {/*<Carlist />*/}
        <Login/>
    </div>
  );
}

export default App;

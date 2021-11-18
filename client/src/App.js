import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login'
import Register from './components/Register'
import Transfer from './components/Transfer';

function App() {
  return (
    <Router>
      <Fragment>
        <div classname = 'container'>   
          <Route exact path = '/transfer' component = {Transfer}/>
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/register' component = {Register} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

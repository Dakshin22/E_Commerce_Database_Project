import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Fragment>
        <div classname = 'container'>
          <Route path = '/' component = {Login} /> {/* you can set the path as '/' as well for when the server loads*/}
          <Route path = '/register' component = {Register} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

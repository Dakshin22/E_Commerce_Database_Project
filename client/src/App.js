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
          <Switch>
          <Route path = '/transfer' component = {Transfer}/>
          <Route path = '/' exact component = {Login} /> {/* you can set the path as '/' as well for when the server loads*/}
          <Route path = '/register' component = {Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

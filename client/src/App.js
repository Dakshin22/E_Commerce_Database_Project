import React, {Fragment} from 'react';
import './App.css';

// components

import ListItems from './components/ListItems';

function App() {
  return (
    <Fragment> 
      <div className="container">
    <ListItems />
      </div>
    </Fragment>
  );
}

export default App;


import React from 'react';

import NavBar from './components/navbar'
import Routes from './core/routes'

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes />
      </div>
    </>
  );
}

export default App;
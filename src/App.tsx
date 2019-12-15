import './App.css';

import React from 'react';

import { Tiers } from './views/Tiers';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Login></Login> */}
      <Tiers></Tiers>
    </div>
  );
}

export default App;

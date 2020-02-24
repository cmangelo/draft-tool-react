import './App.scss';

import React from 'react';

import DraftBoard from './views/DraftBoard';

const App: React.FC = () => {
  return (
    <div className="App container">
      {/* <Login></Login> */}
      {/* <Rankings></Rankings> */}
      <DraftBoard></DraftBoard>
    </div>
  );
}

export default App;

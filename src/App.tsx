import './App.scss';
import 'normalize.css/normalize.css';

import React from 'react';

import Rankings from './views/Rankings';

const App: React.FC = () => {
  return (
    <div className="App container">
      {/* <Login></Login> */}
      <Rankings></Rankings>
    </div>
  );
}

export default App;

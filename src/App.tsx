import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import DraftBoard from './views/DraftBoard';
import { Login } from './views/Login';
import Rankings from './views/Rankings';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Router>
        <div>
          <nav>
            <Link to="/rankings">Rankings</Link>
            &nbsp;
            <Link to="/board">Board</Link>
          </nav>

          <Switch>
            <Route path="/rankings">
              <Rankings />
            </Route>
            <Route path="/board">
              <DraftBoard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <Login></Login> */}
      {/* <Rankings></Rankings> */}
      <DraftBoard></DraftBoard>
    </div>
  );
}

export default App;

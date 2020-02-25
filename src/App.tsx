import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import DraftBoard from './views/DraftBoard';
import DraftsLists from './views/DraftsLists';
import { Login } from './views/Login';
import Rankings from './views/Rankings';

const App: React.FC = () => {
  return (
    <div className="App container">
      <div className="content">
        <Router>
          <div>
            <nav>
              <Link to="/login">Login</Link>
              &nbsp;
            <Link to="/rankings">Rankings</Link>
              &nbsp;
            <Link to="/board">Board</Link>
              &nbsp;
            <Link to="/drafts">Drafts</Link>
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
              <Route path="/drafts">
                <DraftsLists />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;

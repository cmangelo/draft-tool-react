import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CreateDraft from './views/CreateDraft';
import DraftArena from './views/DraftArena';
import DraftsLists from './views/DraftsList';
import { Login } from './views/Login';

const App: React.FC = () => {
  return (
    <div className="App container">
      <div className="content">
        <Router>
          <div>
            <nav>
              <Link to="/login">Login</Link>
              &nbsp;
              <Link to="/drafts">Drafts</Link>
              &nbsp;
            </nav>

            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/drafts/create" component={CreateDraft} />
              <Route path="/drafts/:draftId" component={DraftArena} />
              <Route path="/drafts" component={DraftsLists} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;

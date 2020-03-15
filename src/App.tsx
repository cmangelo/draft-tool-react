import './App.scss';

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { history } from './store/storeConfig';
import CreateDraft from './views/CreateDraft';
import DraftArena from './views/DraftArena';
import DraftsLists from './views/DraftsList';
import { FileUpload } from './views/FileUpload';
import { Login } from './views/Login';

const App: React.FC = () => {
  const loggedIn = !!localStorage.getItem('token');

  return (
    <div className="App container">
      <div className="content">
        <ConnectedRouter history={history}>
          <div>
            <nav>
              {
                loggedIn ? (
                  <div>
                    <Link to="/drafts">Drafts</Link>
                    &nbsp;
                    <Link to="/fileUpload">Upload</Link>
                  </div>
                ) : (
                    <Link to="/login">Login</Link>
                  )
              }
            </nav>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/drafts/create" component={CreateDraft} />
              <Route path="/drafts/:draftId" component={DraftArena} />
              <Route path="/drafts" component={DraftsLists} />
              <Route path="/fileUpload" component={FileUpload} />
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    </div>
  );
}

export default App;

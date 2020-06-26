import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export const endpoint = true ? 'https://draft-tool-api.herokuapp.com/' : 'http://157.245.231.113/api/';


export const history = createBrowserHistory();
export default createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
    )
);

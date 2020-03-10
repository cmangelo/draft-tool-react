import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const localDev = false;
export const endpoint = localDev ? 'http://localhost:3000/' : 'http://138.197.197.35/';

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(endpoint)),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

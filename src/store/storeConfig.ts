import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const localDev = false;
export const endpoint = localDev ? 'http://localhost:3000/' : 'http://157.245.231.113/api/';

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(endpoint)),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

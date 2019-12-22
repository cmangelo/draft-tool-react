import { createStore } from 'redux';

import rootReducer from './reducers';

export default createStore(rootReducer, (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__());

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import draft from './draft';
import entities from './entities';
import rankings from './rankings';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    entities,
    rankings,
    draft
});

export default createRootReducer;
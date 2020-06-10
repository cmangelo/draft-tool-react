import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import draft from './draft';
import entities from './entities';
import rankings from './rankings';
import user from './user';
import userRanks from './user-ranks';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    entities,
    rankings,
    draft,
    userRanks,
    user
});

export default createRootReducer;
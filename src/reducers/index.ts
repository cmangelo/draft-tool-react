import { combineReducers } from 'redux';

import draft from './draft';
import entities from './entities';
import rankings from './rankings';

export default combineReducers({ entities, rankings, draft });

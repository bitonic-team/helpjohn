import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import userReducer from './user';
import itemsReducer from './items';

const rootReducer = combineReducers({
    routing: routeReducer,
    user: userReducer,
    items: itemsReducer
});

export default rootReducer;

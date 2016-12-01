import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import userReducer from './user';

const rootReducer = combineReducers({
    routing: routeReducer,
    user: userReducer
});

export default rootReducer;

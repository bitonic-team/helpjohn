import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import segmentReducer from './segment';

const rootReducer = combineReducers({
    routing: routeReducer,
    segment: segmentReducer
});

export default rootReducer;

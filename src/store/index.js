import {createStore, applyMiddleware} from 'redux';
import {browserHistory} from 'react-router';
import {syncHistory} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const middlewares = [
    syncHistory(browserHistory),
    thunkMiddleware,
    createLogger({collapsed: true, duration: true})
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState);
}
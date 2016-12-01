import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store';
import routes from './routes';
import './css/main.scss';

const store = configureStore();
const node = (
    <Provider store={store}>
        {routes}
    </Provider>
);
const root = document.getElementById('root');
ReactDOM.render(node, root);
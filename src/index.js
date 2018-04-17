/* react redux preamble */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

/** App components */
import './styles/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {rootState, rootSaga} from './state';

/* store and middleware */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

/* let's kick it off */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
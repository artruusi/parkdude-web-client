import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Store } from "./store/types";
import {Provider} from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import {userReducer} from './store/reducers/userReducer'

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const rootReducer = combineReducers({
    user: userReducer
});

const store: Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducer);

export default store;

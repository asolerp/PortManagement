import {applyMiddleware, combineReducers, createStore} from 'redux';
// REDUCERS
import {filterReducer} from './filterReducer';
import {jobFormReducer} from './jobFormReducer';
import {houseFormReducer} from './houseFormReducer';
import {userReducer} from './userReducer';

const rootReducer = combineReducers({
  filters: filterReducer,
  jobForm: jobFormReducer,
  userLoggedIn: userReducer,
  houseForm: houseFormReducer,
});

let middlewaresToApply = [];

if (__DEV__) {
  const createFlipperDebugger = require('redux-flipper').default;
  middlewaresToApply.push(createFlipperDebugger());
}

const middelware = applyMiddleware(...middlewaresToApply);

const store = createStore(rootReducer, middelware);

export default store;

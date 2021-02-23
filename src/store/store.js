import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
// REDUCERS
import {filterReducer} from './filterReducer';
import {jobFormReducer} from './jobFormReducer';

const rootReducer = combineReducers({
  filters: filterReducer,
  jobForm: jobFormReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

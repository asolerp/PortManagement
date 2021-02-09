import React, {createContext, useReducer} from 'react';
import JobFormReducer from './jobFormReducer';

const initialState = {
  job: {},
};

const JobFormStore = ({children}) => {
  const [state, dispatch] = useReducer(JobFormReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default JobFormStore;

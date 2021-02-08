import React, {createContext, useReducer} from 'react';
import JobFormReducer from './jobFormReducer';

const initialState = {
  date: {
    value: new Date(),
    switch: false,
  },
};

const JobFormStore = ({children}) => {
  const [state, dispatch] = useReducer(JobFormReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default JobFormStore;

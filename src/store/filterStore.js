import React, {createContext, useReducer} from 'react';
import FilterReducer from './filterReducer';

const initialState = {
  houses: [],
};

const FilterStore = ({children}) => {
  const [state, dispatch] = useReducer(FilterReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default FilterStore;

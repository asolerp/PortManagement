const INITIAL_FILTER_STATE = {
  houses: [],
  filterDate: new Date(),
};

export const filterReducer = (state = INITIAL_FILTER_STATE, action) => {
  switch (action.type) {
    case 'ADD_HOUSE':
      return {
        ...state,
        houses: action.payload,
      };
    case 'SET_DATE':
      return {
        ...state,
        filterDate: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

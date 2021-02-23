const INITIAL_FILTER_STATE = {
  houses: [],
};

export const filterReducer = (state = INITIAL_FILTER_STATE, action) => {
  switch (action.type) {
    case 'ADD_HOUSE':
      return {
        ...state,
        houses: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

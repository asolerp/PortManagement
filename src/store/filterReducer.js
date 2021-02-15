const FilterReducer = (state, action) => {
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

export default FilterReducer;

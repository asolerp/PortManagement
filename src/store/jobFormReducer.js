const JobFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload,
      };
    case 'SET_FORM':
      return {
        ...state,
        [action.input]: action.payload,
      };
    default:
      return state;
  }
};

export default JobFormReducer;

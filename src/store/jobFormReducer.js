const JobFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        job: {...state.job, [action.label]: action.payload},
      };
    default:
      return state;
  }
};

export default JobFormReducer;

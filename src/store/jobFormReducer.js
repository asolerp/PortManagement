const JobFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        job: {...state.job, [action.label]: action.payload},
      };
    case 'ADD_TASK':
      return {
        ...state,
        job: {
          ...state.job,
          [action.label]:
            state?.job[action.label]?.length > 0
              ? state.job[action.label].concat([action.payload])
              : [action.payload],
        },
      };
    case 'RESET_FORM':
      return {
        ...state,
        job: {},
      };
    case 'RESET_TASK':
      return {
        ...state,
        job: {
          ...state.job,
          taskName: undefined,
          taskWorkers: undefined,
          taskDescription: undefined,
          taskPriority: undefined,
        },
      };
    default:
      return state;
  }
};

export default JobFormReducer;

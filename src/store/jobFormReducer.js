const JobFormReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_FORM':
      console.log(action.payload);
      return {
        ...state,
        job: {
          ...state.job,
          ...action.payload,
        },
      };
    case 'CHANGE_FORM_MODE':
      return {
        ...state,
        job: {
          ...state.job,
          mode: action.payload,
        },
      };
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
        job: {
          mode: 'new',
        },
      };
    case 'REMOVE_TASK':
      console.log(state);
      return {
        ...state,
        job: {
          ...state.job,
          tasks: action.payload,
        },
      };
    case 'RESET_TASK':
      return {
        ...state,
        job: {
          ...state.job,
          mode: 'new',
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

const INITIAL_JOB_FORM_STATE = {
  job: {
    mode: 'new',
    tasks: [],
  },
};

export const jobFormReducer = (state = INITIAL_JOB_FORM_STATE, action) => {
  switch (action.type) {
    case 'ADD_EDITED_TASK': {
      console.log(action.index, action.payload);
      let job = state.job;
      const editedClonedTasks = [...job.tasks];
      editedClonedTasks[action.index] = action.payload;
      return {
        ...state,
        job: {
          ...state.job,
          tasks: editedClonedTasks,
        },
      };
    }
    case 'EDIT_FORM':
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
          [action.label]: [...state.job.tasks, action.payload],
        },
      };
    case 'RESET_FORM':
      return {
        ...state,
        job: {
          mode: 'new',
          tasks: [],
        },
      };
    case 'REMOVE_TASK':
      let job = state.job;
      const cloneTasks = [...job.tasks];
      cloneTasks.splice(action.payload, 1);

      return {
        ...state,
        job: {
          ...state.job,
          tasks: cloneTasks,
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

export const setInputForm = (label, value) => {
  return {
    type: 'SET_FORM',
    label: label,
    payload: value,
  };
};

export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    label: 'tasks',
    payload: task,
  };
};

export const resetTask = () => {
  return {
    type: 'RESET_TASK',
    label: 'tasks',
  };
};

export const resetForm = () => {
  return {
    type: 'RESET_FORM',
  };
};

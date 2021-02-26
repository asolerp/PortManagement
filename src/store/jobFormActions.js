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

export const editForm = (task, job) => {
  return {
    type: 'EDIT_FORM',
    payload: {
      jobId: job.id,
      taskId: task.id,
      taskName: task.name,
      taskDescription: task.description,
      taskWorkers: {value: task.workers, switch: true},
      taskPriority: {value: task.priority, switch: true},
      mode: 'edit',
    },
  };
};

export const removeTask = (taskId) => {
  return {
    type: 'REMOVE_TASK',
    payload: taskId,
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

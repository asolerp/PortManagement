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
  console.log(task);
  return {
    type: 'EDIT_FORM',
    payload: {
      jobId: job?.id,
      taskId: task?.id || task?.internalUUID,
      taskName: task?.name,
      taskDescription: task?.description,
      taskWorkers: {
        value: task?.workers || task?.workers?.value,
        switch:
          task?.workers?.length > 0 || task?.workers?.value?.length > 0
            ? true
            : false,
      },
      taskPriority: {
        value: task?.priority || task?.priority?.value,
        switch: task?.priority || task?.priority?.value ? true : false,
      },
      mode: 'edit',
    },
  };
};

export const addEditedTask = (index, task) => {
  return {
    type: 'ADD_EDITED_TASK',
    index: index,
    payload: task,
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

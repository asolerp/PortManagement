import {
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  PRIORITY_HEIGHT,
} from '../constants/colors';

export const parsePriority = (priority) => {
  switch (priority) {
    case 'low':
      return 'Baja';
    case 'medium':
      return 'Media';
    case 'height':
      return 'Alta';
  }
};

export const parsePriorityColor = (priority) => {
  switch (priority) {
    case 'low':
      return PRIORITY_LOW;
    case 'medium':
      return PRIORITY_MEDIUM;
    case 'height':
      return PRIORITY_HEIGHT;
  }
};

export const percentageOfComplete = (tasks) => {
  const completedTaks = tasks.filter((task) => task.complete).length;
  console.log('compoleted', completedTaks);
  return completedTaks / tasks.length;
};

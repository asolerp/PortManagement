import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  PRIORITY_HEIGHT,
} from '../constants/colors';

export const getHightByRoute = (route) => {
  switch (route) {
    case 'Dashboard':
      return 210;
    default:
      return 250;
  }
};

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

export const parsePirorityIcon = (priority) => {
  switch (priority) {
    case 'low':
      return {
        name: 'arrow-downward',
        color: PRIORITY_LOW,
      };
    case 'medium':
      return {
        name: 'arrow-forward',
        color: PRIORITY_MEDIUM,
      };
    case 'height':
      return {
        name: 'arrow-upward',
        color: PRIORITY_HEIGHT,
      };
    default:
      break;
  }
};

export const generateCalendarDots = (list) => {
  let dotsArray = [];

  list.forEach((job) => {
    const indexDotElement = dotsArray.findIndex((dotObject) => {
      return (
        moment(dotObject.date).format('DD-MM-YYYY') ===
        moment(job.date.toDate()).format('DD-MM-YYYY')
      );
    });
    if (indexDotElement !== -1) {
      const dotsOnFindedDate = {
        date: moment(job.date.toDate()),
        dots: dotsArray[indexDotElement].dots.concat([
          {color: parsePriorityColor(job?.priority) || 'black'},
        ]),
      };
      dotsArray[indexDotElement] = dotsOnFindedDate;
    } else {
      dotsArray.push({
        date: moment(job.date.toDate()),
        dots: [{color: parsePriorityColor(job?.priority) || 'black'}],
      });
    }
  });

  return dotsArray;
};

export const percentageOfComplete = (tasks) => {
  const completedTasks = tasks?.filter((task) => task.complete).length;
  return completedTasks / tasks?.length;
};

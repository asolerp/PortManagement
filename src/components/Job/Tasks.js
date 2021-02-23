import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';

// Firebase
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';
import {useDeleteFirebase} from '../../hooks/useDeleteFirebase';

import Task from '../Elements/Task';
import {deleteTaskAlert} from '../Alerts/deleteJobAlert';

// Styles
import {defaultTextTitle} from '../../styles/common';
import NewEditTask from '../Forms/Jobs/NewEditTask';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 40,
    flex: 1,
  },
  titleTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  formWrapper: {
    height: 'auto',
  },
  tasksWrapper: {
    flex: 1,
  },
  newTask: {
    marginBottom: 0,
  },
  tasks: {
    marginBottom: 20,
  },
});

const Tasks = ({job, tasks}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const {job: jobFormState} = useSelector(
    ({jobForm: {job}}) => ({job}),
    shallowEqual,
  );
  const {updateFirebase, loading, error} = useUpdateFirebase('jobs');

  const {
    deleteFirebase,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteFirebase();

  const editForm = useCallback(
    (task) =>
      dispatch({
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
      }),
    [dispatch, job],
  );

  const resetTask = useCallback(
    () =>
      dispatch({
        type: 'RESET_TASK',
        label: 'tasks',
      }),
    [dispatch],
  );

  console.log('state', jobFormState);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleDeleteTask = (jobId, taskId) => {
    deleteFirebase(`jobs/${jobId}/tasks`, taskId);
  };

  const handleItemSelect = (task) => {
    editForm(task);
  };

  useEffect(() => {
    if (jobFormState.mode === 'edit') {
      setExpanded(true);
    }
  }, [jobFormState]);

  useEffect(() => {
    if (!expanded) {
      resetTask();
    }
  }, [resetTask, expanded]);

  const handleTaskSelector = (taskId, update) => {
    updateFirebase(`${job.id}/tasks/${taskId}`, update);
  };

  const handleEditTask = () => {
    const editedTask = {
      name: jobFormState.taskName,
      description: jobFormState.taskDescription,
      priority: jobFormState.taskPriority?.value,
      workers: jobFormState.taskWorkers?.value,
    };
    updateFirebase(
      `${jobFormState.jobId}/tasks/${jobFormState.taskId}`,
      editedTask,
    );
    dispatch({
      type: 'RESET_TASK',
      label: 'tasks',
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => toggleExpand()}>
          <View style={styles.titleTextWrapper}>
            <Text style={{...styles.newTask, ...defaultTextTitle}}>
              Nueva tarea
            </Text>
            <Icon
              name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
              color="#284748"
              size={25}
            />
          </View>
        </TouchableOpacity>
        {expanded && (
          <ScrollView style={styles.formWrapper}>
            <NewEditTask onEdit={handleEditTask} />
          </ScrollView>
        )}
      </View>
      <View style={styles.tasksWrapper}>
        <Text style={{...styles.tasks, ...defaultTextTitle}}>Tareas</Text>
        {tasks?.map((task, i) => (
          <Task
            job={job}
            task={task}
            index={i}
            key={task.id}
            onItemClick={handleItemSelect}
            onSelect={handleTaskSelector}
            onDelete={() =>
              deleteTaskAlert(() => handleDeleteTask(task.jobId, task.id))
            }
          />
        ))}
      </View>
    </View>
  );
};

export default Tasks;

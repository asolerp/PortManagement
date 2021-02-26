import React, {useCallback, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';

// Firebase
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';
import {useAddFirebase} from '../../hooks/useAddFirebase';
import {useDeleteFirebase} from '../../hooks/useDeleteFirebase';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {resetTask, editForm} from '../../store/jobFormActions';

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
    addFirebase: addTask,
    loading: loadingTask,
    error: addTaskError,
  } = useAddFirebase();

  const {
    deleteFirebase,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteFirebase();

  const editFormAaction = useCallback((task) => dispatch(editForm(task, job)), [
    dispatch,
    job,
  ]);

  const resetTaskAction = useCallback(() => dispatch(resetTask()), [dispatch]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    if (expanded) {
      resetTaskAction();
    }
  };

  const handleDeleteTask = (jobId, taskId) => {
    deleteFirebase(`jobs/${jobId}/tasks`, taskId);
  };

  const handleNewTask = () => {
    const newTask = {
      name: jobFormState.taskName,
      date: job.date,
      description: jobFormState.taskDescription,
      priority: jobFormState.taskPriority?.value,
      workers: jobFormState.taskWorkers?.value,
      jobId: job.id,
    };
    console.log(job.id, newTask);
    addTask(`jobs/${job.id}/tasks`, newTask);
    resetTaskAction();
  };

  const handleItemSelect = (task) => {
    editFormAaction(task);
  };

  useEffect(() => {
    if (jobFormState.mode === 'edit') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(true);
    }
  }, [jobFormState]);

  const handleTaskSelector = (taskId, update) => {
    updateFirebase(`${job.id}/tasks/${taskId}`, update);
  };

  const handleEditTask = useCallback(() => {
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
    resetTaskAction();
  }, [jobFormState, resetTaskAction, updateFirebase]);

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
            <NewEditTask onSubmit={handleNewTask} onEdit={handleEditTask} />
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

export default React.memo(Tasks);

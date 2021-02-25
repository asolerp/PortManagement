import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {resetTask, addTask} from '../../../store/jobFormActions';

import Task from '../../Elements/Task';
import NewEditTask from './NewEditTask';

import {deleteTaskAlert} from '../../Alerts/deleteJobAlert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: '#2A7BA5',
  },
  tasksContainer: {
    flex: 1,
  },
  tasksTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

const TaskForm = ({onNew, onEdit}) => {
  const dispatch = useDispatch();
  const {job} = useSelector(({jobForm: {job}}) => ({job}), shallowEqual);

  const addTaskAction = useCallback((task) => dispatch(addTask(task)), [
    dispatch,
  ]);

  const resetTaskAction = useCallback(() => dispatch(resetTask()), [dispatch]);

  const onDeleteTask = (taskId) => {
    console.log(taskId);
    // const oldState = state?.job?.tasks;
    // console.log('old state', oldState);
    // const newTasks = state?.job?.tasks?.splice(taskId, 1);
    // console.log('new state', newTasks);
    // dispatch({
    //   type: 'REMOVE_TASK',
    //   payload: newTasks,
    // });
  };

  const addTaskHandler = () => {
    const task = {
      name: job.taskName,
      description: job.taskDescription,
      workers: job.taskWorkers,
      priority: job.taskPriority,
    };
    addTaskAction(task);
  };

  const cleanTask = () => {
    resetTaskAction();
  };

  const handleSubmitNew = () => {
    addTaskHandler();
    cleanTask();
  };

  const handleSubmitEdit = () => {};

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <NewEditTask
            onSubmit={job.mode === 'new' ? handleSubmitNew : handleSubmitEdit}
          />
        </ScrollView>
      </View>
      <Text style={styles.tasksTitle}>Tareas</Text>
      <View style={styles.tasksContainer}>
        <ScrollView>
          {job.tasks?.map((task, i) => (
            <Task
              task={task}
              key={i}
              onDelete={() => deleteTaskAlert(() => onDeleteTask(i))}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TaskForm;

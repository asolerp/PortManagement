import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Context
import {Context} from '../../../store/jobFormStore';

import Task from '../../Elements/Task';
import NewEditTask from './NewEditTask';

import {v4 as uuidv4} from 'uuid';

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
  console.log('Render Task Form');
  const [state, dispatch] = useContext(Context);

  const addTask = () => {
    const task = {
      name: state?.job?.taskName,
      description: state?.job?.taskDescription,
      workers: state?.job?.taskWorkers,
      priority: state?.job?.taskPriority,
    };
    dispatch({
      type: 'ADD_TASK',
      label: 'tasks',
      payload: task,
    });
  };

  const cleanTask = () => {
    dispatch({
      type: 'RESET_TASK',
      label: 'tasks',
    });
  };

  const handleSubmitNew = () => {
    addTask();
    cleanTask();
  };

  const handleSubmitEdit = () => {};

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <NewEditTask
            onSubmit={
              state.job.mode === 'new' ? handleSubmitNew : handleSubmitEdit
            }
          />
        </ScrollView>
      </View>
      <Text style={styles.tasksTitle}>Tareas</Text>
      <View style={styles.tasksContainer}>
        <ScrollView>
          {state?.job?.tasks?.map((task, i) => (
            <Task task={task} key={i} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TaskForm;

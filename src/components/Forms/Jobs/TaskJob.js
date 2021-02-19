import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Context
import {Context} from '../../../store/jobFormStore';

import Task from '../../Elements/Task';
import NewEditTask from './NewEditTask';

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

const TaskForm = () => {
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

  const handleSubmit = () => {
    addTask();
    cleanTask();
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <NewEditTask onSubmit={handleSubmit} />
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

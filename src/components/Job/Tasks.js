import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import Task from '../Elements/Task';

// Styles
import {defaultTextTitle} from '../../styles/common';
import NewEditTask from '../Forms/Jobs/NewEditTask';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 40,
    flex: 1,
  },
  newTask: {
    marginBottom: 20,
  },
});

const Tasks = ({job, tasks}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{...styles.newTask, ...defaultTextTitle}}>
          Nueva tarea
        </Text>
        <ScrollView style={{height: 'auto'}}>
          <NewEditTask />
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <Text style={{...styles.newTask, ...defaultTextTitle}}>Tareas</Text>
        {tasks?.map((task, i) => (
          <Task job={job} task={task} index={i} key={i} />
        ))}
      </View>
    </View>
  );
};

export default Tasks;

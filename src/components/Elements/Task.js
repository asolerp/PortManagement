import Avatar from '../Avatar';

import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

//Utils
import {parsePriorityColor} from '../../utils/parsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selector: {
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
    width: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  description: {
    fontSize: 10,
    color: '#2A7BA5',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  priorityContainer: {
    height: '100%',
    width: 7,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});

const Task = ({task}) => {
  console.log('task', task);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.selector} />
        <View>
          <Text>{task?.name}</Text>
          {task?.description && (
            <Text style={styles.description}>{task?.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.avatarContainer}>
          {task?.workers.value?.map((worker, i) => (
            <Avatar key={i} uri={worker?.profileImage} />
          ))}
        </View>
        <View
          style={[
            styles.priorityContainer,
            {backgroundColor: parsePriorityColor(task.priority.value)},
          ]}
        />
      </View>
    </View>
  );
};

export default Task;

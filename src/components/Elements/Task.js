import Avatar from '../Avatar';

import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Firebase
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';

// Context
import {Context} from '../../store/jobFormStore';

//Utils
import {parsePriorityColor, parsePirorityIcon} from '../../utils/parsers';
import {TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  priority: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,

    borderRadius: 20,
    marginLeft: 5,
    marginRight: 15,
    backgroundColor: 'white',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#BCBCBC',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selector: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  selectorActive: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  description: {
    fontSize: 10,
    color: '#2A7BA5',
  },
  rightContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  priorityContainer: {
    height: '100%',
    width: 7,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});

const Task = ({job, task, index}) => {
  const {updateFirebase, loading, error} = useUpdateFirebase('jobs');
  const workers = task?.workers || task?.workers.value;
  const [state, dispatch] = useContext(Context);

  const handleEditTask = () => {
    dispatch({
      type: 'SET_FORM',
      label: 'taskName',
      payload: task.name,
    });
    dispatch({
      type: 'SET_FORM',
      label: 'taskDescription',
      payload: task.description,
    });
    dispatch({
      type: 'SET_FORM',
      label: 'taskWorkers',
      payload: {value: task.workers, switch: true},
    });
    dispatch({
      type: 'SET_FORM',
      label: 'taskPriority',
      payload: {value: task.priority, switch: true},
    });
  };

  const handleTaskSelector = () => {
    const tasks = job.tasks;
    tasks[index] = {...tasks[index], done: !tasks[index].done};
    updateFirebase(job.id, {...job, tasks: tasks});
  };

  return (
    <TouchableOpacity onPress={() => handleEditTask()}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => handleTaskSelector()}>
            <View
              style={{
                ...styles.selector,
                ...{borderColor: parsePriorityColor(task?.priority)},
              }}>
              {task?.done && (
                <View
                  style={{
                    ...styles.selectorActive,
                    ...{backgroundColor: parsePriorityColor(task?.priority)},
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <Text>{task?.name}</Text>
            {task?.description && (
              <Text style={styles.description}>{task?.description}</Text>
            )}
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.avatarContainer}>
            {workers.map((worker, i) => (
              <Avatar
                key={i}
                uri={worker?.profileImage}
                overlap
                size="medium"
              />
            ))}
          </View>
          {task?.priority && (
            <View
              style={[
                styles.priority,
                {
                  backgroundColor: parsePriorityColor(
                    task?.priority || task?.priority.value,
                  ),
                },
              ]}>
              <Icon
                name={parsePirorityIcon(task?.priority).name}
                color="white"
                size={25}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

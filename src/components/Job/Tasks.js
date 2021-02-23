import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';

// Firebase
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';

// Context
import {Context} from '../../store/jobFormStore';

import Task from '../Elements/Task';

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
  const [state, dispatch] = useContext(Context);
  const {updateFirebase, loading, error} = useUpdateFirebase('jobs');
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleItemSelect = (task) => {
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
    });
  };

  useEffect(() => {
    if (state?.job?.mode === 'edit') {
      setExpanded(true);
    }
  }, [state.job]);

  useEffect(() => {
    if (!expanded) {
      dispatch({
        type: 'RESET_TASK',
        label: 'tasks',
      });
    }
  }, [expanded, dispatch]);

  const handleTaskSelector = (taskId, update) => {
    updateFirebase(`${job.id}/tasks/${taskId}`, update);
  };

  const handleEditTask = () => {
    const editedTask = {
      name: state?.job?.taskName,
      description: state?.job?.taskDescription,
      priority: state?.job?.taskPriority?.value,
      workers: state?.job?.taskWorkers?.value,
    };
    updateFirebase(
      `${state?.job?.jobId}/tasks/${state?.job?.taskId}`,
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
          />
        ))}
      </View>
    </View>
  );
};

export default Tasks;

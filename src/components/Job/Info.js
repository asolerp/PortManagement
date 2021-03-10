import React, {useCallback, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';

// Firebase
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';
import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
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

const Info = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {jobId} = route.params;
  const {document: job, loadingJob, errorJob} = useGetDocFirebase(
    'jobs',
    jobId,
  );

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

  const editFormAaction = useCallback((task) => dispatch(editForm(task, job)), [
    dispatch,
    job,
  ]);

  const resetTaskAction = useCallback(() => dispatch(resetTask()), [dispatch]);

  const handleDeleteTask = (jobId, taskId) => {
    deleteFirebase(`jobs/${jobId}/tasks`, taskId);
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

  return (
    <View style={styles.container}>
      <Text>Observaciones</Text>
      <Text>{job?.observations}</Text>
    </View>
  );
};

export default React.memo(Info);

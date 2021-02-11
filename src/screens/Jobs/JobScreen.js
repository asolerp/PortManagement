import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const JobScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  console.log(jobId);
  return <View style={styles.container} />;
};

export default JobScreen;

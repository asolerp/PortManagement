import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AddButton from '../../components/Elements/AddButton';
import JobItem from '../../components/JobItem';
import TitlePage from '../../components/TitlePage';

//Firebase
import {useGetFirebase} from '../../hooks/useGetFirebase';

const JobsScreen = ({navigation}) => {
  const {list, loading, error} = useGetFirebase('jobs');

  console.log(list, loading);

  const handleNewJob = () => {
    navigation.navigate('NewJob');
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewJob()}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TitlePage title="Trabajos" color="black" />
        <View style={styles.jobsScreen}>
          {list.map((item) => (
            <TouchableOpacity
              style={{width: '100%'}}
              key={item.id}
              onPress={() =>
                navigation.navigate('JobScreen', {
                  jobId: item.id,
                })
              }>
              <JobItem job={item} />
            </TouchableOpacity>
          ))}
          {/* <Text>No tienes nigún trabajo activo en este momento</Text> */}
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  jobsScreen: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
  },
});

export default JobsScreen;

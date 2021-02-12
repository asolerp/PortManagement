import React from 'react';
import {Dimensions} from 'react-native';

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
          {list?.map((item, i) => (
            <JobItem
              job={item}
              key={i}
              onPress={() =>
                navigation.navigate('JobScreen', {
                  jobId: item.id,
                })
              }
            />
          ))}
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: Dimensions.get('window').height / 10,
  },
  jobsScreen: {
    flex: 10,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#2d2d2d',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default JobsScreen;

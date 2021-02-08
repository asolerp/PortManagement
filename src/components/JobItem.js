import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import Avatar from './Avatar';

import {parsePriorityColor} from '../utils/parsers';

const styles = StyleSheet.create({
  container: {
    width: '47%',
    height: 200,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
  },
  firstSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  titleSubtitle: {
    width: '95%',
  },
  priority: {
    width: '5%',
    height: 50,
    borderRadius: 30,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

const JobItem = ({job}) => {
  console.log('trabajo', job.name);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{job.name}</Text>
          <Text style={styles.subtitle}>{job.description}</Text>
        </View>
        {job.priority && (
          <View
            style={[
              styles.priority,
              {backgroundColor: parsePriorityColor(job.priority)},
            ]}
          />
        )}
      </View>
      <View style={styles.calendar}>
        <Icon name="calendar-today" color="black" />
        <Text style={styles.date}>{moment(job.date).format('LL')}</Text>
      </View>
      <View style={styles.workers}>
        {job.workers.map((worker) => (
          <Avatar uri={worker.profileImage} />
        ))}
      </View>
      <View styles={styles.progressContainer} />
      <View styles={styles.bottomIcons} />
    </View>
  );
};

export default JobItem;

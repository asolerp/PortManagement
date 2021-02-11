import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import Avatar from './Avatar';

import {parsePriorityColor, percentageOfComplete} from '../utils/parsers';

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
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
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
  percentage: {
    textAlign: 'right',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  workers: {
    flexDirection: 'row',
  },
});

const JobItem = ({job}) => {
  console.log('trabajo', job);

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
        {job?.workers?.map((worker, i) => (
          <Avatar
            uri={worker.profileImage}
            overlap={true}
            position={job.workers.length - i}
          />
        ))}
      </View>
      <View styles={styles.progressContainer}>
        <Text style={styles.percentage}>
          {Math.round(percentageOfComplete(job.tasks) * 100)}%
        </Text>
        <Progress.Bar
          progress={percentageOfComplete(job.tasks)}
          unfilledColor={'#E2E2E2'}
          borderWidth={0}
          color={'#126D9B'}
        />
      </View>
      <View styles={styles.bottomIcons} />
    </View>
  );
};

export default JobItem;

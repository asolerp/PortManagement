import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import Avatar from './Avatar';

import {parsePriorityColor, percentageOfComplete} from '../utils/parsers';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    width: '100%',

    marginBottom: 20,
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
    width: '97%',
  },
  priority: {
    width: '3%',
    height: '100%',
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
    width: '95%',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  progressContainer: {
    flex: 1,
  },
  bottomIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

const JobItem = ({job, onPress}) => {
  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
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
        {expanded && (
          <View>
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
                  size={'medium'}
                />
              ))}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.progressContainer}>
                <Text style={styles.percentage}>
                  {Math.round(percentageOfComplete(job.tasks) * 100)}%
                </Text>
                <Progress.Bar
                  progress={percentageOfComplete(job.tasks)}
                  unfilledColor={'#E2E2E2'}
                  borderWidth={0}
                  width={null}
                  color={'#126D9B'}
                />
              </View>
              <View style={styles.bottomIcons}>
                <TouchableOpacity onPress={onPress}>
                  <Icon name="remove-red-eye" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default JobItem;

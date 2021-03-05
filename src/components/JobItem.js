import React, {useState, useEffect} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import firestore from '@react-native-firebase/firestore';

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

import {
  parsePriorityColor,
  parsePirorityIcon,
  percentageOfComplete,
} from '../utils/parsers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RightActions from './Elements/RightActions';
import {deleteJobAlert} from './Alerts/deleteJobAlert';

//Firebase
import {useGetFirebase} from '../hooks/useGetFirebase';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 20,
    padding: 10,
    elevation: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#BCBCBC',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
  },
  swipperContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  firstSection: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  titleSubtitle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginRight: 10,
    color: '#3DB6BA',
  },
  priority: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    height: '100%',
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#BCBCBC',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#284748',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
    width: '95%',
    color: '#284748',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);

  const {user} = useSelector(
    ({userLoggedIn: {user}}) => ({user}),
    shallowEqual,
  );

  const onResult = (QuerySnapshot) => {
    setLoading(false);
    setList(
      QuerySnapshot.docs
        .map((doc) => ({...doc.data(), id: doc.id}))
        .filter((message) => !message.received)
        .filter((message) => message.user._id !== user.uid),
    );
  };

  const onError = (err) => {
    setLoading(false);
    setError(err);
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    const collectionJobs = firestore().collection('jobs');
    const jobDocument = collectionJobs.doc(job.id);
    const messagesQuery = jobDocument.collection('messages');

    const subscriber = messagesQuery.onSnapshot(onResult, onError);

    return () => subscriber();
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  console.log(list, 'list');

  // const onAction = () => {
  //   deleteFirebase();
  // };

  return (
    // <Swipeable
    //   renderRightActions={(progress, dragX) =>
    //     RightActions(progress, dragX, onAction)
    //   }
    //   containerStyle={styles.swipperContainer}
    //   childrenContainerStyle={{borderRadius: 10}}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.firstSection}>
          {job.priority && (
            <View
              style={[
                styles.priority,
                {backgroundColor: parsePriorityColor(job.priority)},
              ]}
            />
          )}
          <View style={styles.titleSubtitle}>
            <View style={styles.firstLine}>
              <Text style={styles.date}>
                {moment(job.date.toDate()).format('LL')}
              </Text>
              {job?.workers?.map((worker) => (
                <Avatar uri={worker.profileImage} overlap />
              ))}
            </View>
            <Text
              style={
                styles.title
              }>{`Trabajos en ${job.house[0].houseName}`}</Text>
            <Text style={styles.subtitle}>{job?.task?.desc}</Text>
            <Text style={styles.subtitle}>{list.length}</Text>
          </View>
          <View>
            <Icon name="keyboard-arrow-right" color="#284748" size={30} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // </Swipeable>
  );
};

export default JobItem;

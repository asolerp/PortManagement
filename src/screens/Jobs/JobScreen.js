import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TitlePage from '../../components/TitlePage';

import {Info, Messages, Photos} from '../../components/Job';

import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
import {useGetFirebase} from '../../hooks/useGetFirebase';

// UI
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  tabBarLabelStyle: {color: '#284748', fontWeight: 'bold', fontSize: 18},
  tabIndicator: {
    backgroundColor: '#2A7BA5',
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  jobBackScreen: {
    flex: 1,
  },
  jobScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    // height: '100%',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#BCBCBC',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

const FirstRoute = () => <Info />;
const SecondRoute = () => <Messages />;
const ThirdRoute = () => <Photos />;

const JobScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  const {document: job, loading, error} = useGetDocFirebase('jobs', jobId);
  const {list: tasks} = useGetFirebase(`jobs/${jobId}/tasks`);

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    {key: 'info', title: 'Info'},
    {key: 'messages', title: 'Mensajes'},
    {key: 'photos', title: 'Fotos'},
  ]);

  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    info: FirstRoute,
    messages: SecondRoute,
    photos: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({route, focused, color}) => (
        <Text style={styles.tabBarLabelStyle}>{route.title}</Text>
      )}
      indicatorStyle={[
        styles.tabIndicator,
        {left: Dimensions.get('window').width / (routes.length * 2) - 5},
      ]}
      style={styles.tabBarStyle}
    />
  );
  return (
    <React.Fragment>
      <StatusBar barStyle="default" />
      <View style={styles.container}>
        <TitlePage
          leftSide={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.iconWrapper}>
                <Icon name="arrow-back" size={25} color="#5090A5" />
              </View>
            </TouchableOpacity>
          }
          subPage
          title={`Trabajos en ${job?.house && job?.house[0]?.houseName}`}
          subtitle={job?.task?.desc}
          color="white"
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#126D9B', '#67B26F']}
          style={styles.jobBackScreen}>
          <View style={styles.jobScreen}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
            />
          </View>
        </LinearGradient>
      </View>
    </React.Fragment>
  );
};

export default JobScreen;

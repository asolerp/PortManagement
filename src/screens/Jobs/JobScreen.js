import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import TitlePage from '../../components/TitlePage';

import {Tasks, Messages, Photos} from '../../components/Job';

import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';

// Context
import {Context} from '../../store/jobFormStore';

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
  tabBarLabelStyle: {color: 'black', fontWeight: 'bold'},
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
    height: '100%',
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

const JobScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  const {document: job, loading, error} = useGetDocFirebase('jobs', jobId);

  const [state, dispatch] = useContext(Context);

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    {key: 'tasks', title: 'TAREAS'},
    {key: 'messages', title: 'MENSAJES'},
    {key: 'photos', title: 'FOTOS'},
  ]);

  const FirstRoute = () => <Tasks job={job} tasks={job?.tasks} />;
  const SecondRoute = () => <Messages />;
  const ThirdRoute = () => <Photos />;

  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    tasks: FirstRoute,
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
      <ScrollView style={{}}>
        <View style={styles.container}>
          <TitlePage
            leftSide={
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: 'RESET_FORM',
                  });
                  navigation.goBack();
                }}>
                <View style={styles.iconWrapper}>
                  <Icon name="arrow-back" size={25} color="#5090A5" />
                </View>
              </TouchableOpacity>
            }
            subPage
            title={job?.name}
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
      </ScrollView>
    </React.Fragment>
  );
};

export default JobScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import TitlePage from '../../components/TitlePage';

import {Tasks, Messages, Photos} from '../../components/Job';

import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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
});

const JobScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  const {document: job, loading, error} = useGetDocFirebase('jobs', jobId);

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    {key: 'tasks', title: 'TAREAS'},
    {key: 'messages', title: 'MENSAJES'},
    {key: 'photos', title: 'FOTOS'},
  ]);

  const FirstRoute = () => <Tasks />;
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
      <View style={styles.container}>
        <TitlePage
          leftSide={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          }
          title={job?.name}
          color="black"
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </React.Fragment>
  );
};

export default JobScreen;

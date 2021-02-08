import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import TitlePage from '../../components/TitlePage';

import {Text} from 'react-native';
import JobForm from '../../components/Forms/Jobs/JobForm';

const NewJobScreen = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    {key: 'general', title: 'GENERAL'},
    {key: 'tasks', title: 'TAREAS'},
  ]);

  const FirstRoute = () => <JobForm />;

  const SecondRoute = () => (
    <View>
      <Text>Hola</Text>
    </View>
  );

  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    general: FirstRoute,
    tasks: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({route, focused, color}) => (
        <Text style={{color: 'black', fontWeight: 'bold'}}>{route.title}</Text>
      )}
      indicatorStyle={{
        backgroundColor: '#2A7BA5',
        width: 10,
        height: 10,
        borderRadius: 100,
        left: Dimensions.get('window').width / (routes.length * 2) - 5,
      }}
      style={{
        backgroundColor: 'transparent',
        color: 'black',
      }}
    />
  );

  return (
    <View style={styles.container}>
      <TitlePage
        leftSide={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color="black" />
          </TouchableOpacity>
        }
        title="Nuevo Trabajo"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newJobScreen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  asignList: {
    flex: 1,
  },
  inputRecurrenteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  inputRecurrente: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewJobScreen;

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeWorker from '../../screens/Worker/HomeWorker';
import JobScreen from '../../screens/Jobs/JobScreen';

const Stack = createStackNavigator();
const HomeWorkerStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeWorker} />
      <Stack.Screen name="JobScreen" component={JobScreen} />
    </Stack.Navigator>
  );
};

export default HomeWorkerStack;

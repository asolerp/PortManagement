import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

// Redux
import {Provider} from 'react-redux';
import store from '../store/store';

import JobsScreen from '../screens/Jobs/JobsScreen';
import NewJobScreen from '../screens/Jobs/NewJobScreen';
import JobScreen from '../screens/Jobs/JobScreen';

const Stack = createStackNavigator();

export default function JobsStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Jobs"
          component={() => <JobsScreen />}
          options={{
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
        <Stack.Screen name="NewJob" component={NewJobScreen} />
        <Stack.Screen name="JobScreen" component={JobScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

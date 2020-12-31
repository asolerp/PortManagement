import * as React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomesScreen from '../screens/HomesScreen';
import NewHomeScreen from '../screens/NewHomeScreen';

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Homes" component={HomesScreen} />
      <Stack.Screen name="NewHome" component={NewHomeScreen} />
    </Stack.Navigator>
  );
}

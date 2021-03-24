import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomesScreen from '../screens/Homes/HomesScreen';
import NewHomeScreen from '../screens/Homes/NewHomeScreen';
import UserListSelectorScreen from '../screens/UserListSelectorScreen';
import DashboardScreen from '../screens/DashboardScreen';
import IncidenceScreen from '../screens/IncidenceScreen';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Incidence" component={IncidenceScreen} />
    </Stack.Navigator>
  );
}

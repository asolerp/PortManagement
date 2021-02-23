import React, {useState} from 'react';

import {Provider} from 'react-redux';
import store from '../store/store';

import {createStackNavigator} from '@react-navigation/stack';
import HomesScreen from '../screens/Homes/HomesScreen';
import NewHomeScreen from '../screens/Homes/NewHomeScreen';
import UserListSelectorScreen from '../screens/UserListSelectorScreen';

import {NewHouseFormContext} from '../context/newHouseFormContext';

const Stack = createStackNavigator();

export default function HomesStack() {
  const [users, setUsers] = useState([]);

  const handleUsers = (usersSelection) => {
    setUsers(usersSelection);
  };

  const value = {
    users,
    handleUsers,
  };

  return (
    <Provider store={store}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Homes"
          component={HomesScreen}
          options={{
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
        <Stack.Screen name="NewHome" component={NewHomeScreen} />
        <Stack.Screen name="UserList" component={UserListSelectorScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

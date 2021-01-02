import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomesScreen from '../screens/HomesScreen';
import NewHomeScreen from '../screens/NewHomeScreen';
import UserListSelectorScreen from '../screens/UserListSelectorScreen';

import {NewHouseFormContext} from '../context/newHouseFormContext';

const Stack = createStackNavigator();

export default function SignOutStack() {
  const [users, setUsers] = useState([]);

  const handleUsers = (usersSelection) => {
    setUsers(usersSelection);
  };

  const value = {
    users,
    handleUsers,
  };

  return (
    <NewHouseFormContext.Provider value={value}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Homes" component={HomesScreen} />
        <Stack.Screen name="NewHome" component={NewHomeScreen} />
        <Stack.Screen name="UserList" component={UserListSelectorScreen} />
      </Stack.Navigator>
    </NewHouseFormContext.Provider>
  );
}

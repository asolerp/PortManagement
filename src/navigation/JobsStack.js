import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {NewHouseFormContext} from '../context/newHouseFormContext';
import JobsScreen from '../screens/Jobs/JobsScreen';

const Stack = createStackNavigator();

export default function JobsStack() {
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
        <Stack.Screen
          name="Jobs"
          component={JobsScreen}
          options={{
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
      </Stack.Navigator>
    </NewHouseFormContext.Provider>
  );
}

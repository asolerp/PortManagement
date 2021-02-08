import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {NewHouseFormContext} from '../context/newHouseFormContext';

import JobFormStore from '../store/jobFormStore';

import JobsScreen from '../screens/Jobs/JobsScreen';
import NewJobScreen from '../screens/Jobs/NewJobScreen';

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
    <JobFormStore>
      <NewHouseFormContext.Provider value={value}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Jobs"
            component={JobsScreen}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen name="NewJob" component={NewJobScreen} />
        </Stack.Navigator>
      </NewHouseFormContext.Provider>
    </JobFormStore>
  );
}

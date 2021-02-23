import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {NewHouseFormContext} from '../context/newHouseFormContext';

import JobFormStore from '../store/jobFormStore';

import JobsScreen from '../screens/Jobs/JobsScreen';
import NewJobScreen from '../screens/Jobs/NewJobScreen';
import JobScreen from '../screens/Jobs/JobScreen';
import FilterStore from '../store/filterStore';

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
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Jobs"
          component={() => (
            <FilterStore>
              <JobsScreen />
            </FilterStore>
          )}
          options={{
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
        <Stack.Screen name="NewJob" component={NewJobScreen} />
        <Stack.Screen name="JobScreen" component={JobScreen} />
      </Stack.Navigator>
    </JobFormStore>
  );
}

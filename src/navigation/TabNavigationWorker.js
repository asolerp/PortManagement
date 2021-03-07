import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import HomesStack from './HomesStack';
import JobsStack from './JobsStack';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Platform} from 'react-native';

const Tabs = AnimatedTabBarNavigator();

const TabNavigationWorker = () => {
  const getTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'NewJob' || routeName === 'JobScreen') {
      return false;
    }
    return true;
  };

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#3E93A8',
        tabStyle: {
          marginTop: 0,
          marginBottom: Platform.OS === 'ios' ? 20 : 0,
          borderTopWidth: 1,
          borderBottomWidth: 0,
          borderTopColor: '#dbdbdb',
        },
      }}
      appearence={{
        floating: false,
        shadow: true,
        tabBarBackground: 'white',
      }}>
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="dashboard"
              size={size ? size : 24}
              color={focused ? color : '#3E93A8'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="settings"
              size={size ? size : 24}
              color={focused ? color : '#3E93A8'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigationWorker;

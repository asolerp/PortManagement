import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import HomesStack from './HomesStack';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const Tabs = AnimatedTabBarNavigator();

const TabNavigation = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#222222',
        activeBackgroundColor: '#126D9B',
      }}
      appearence={{
        floating: true,
      }}>
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="dashboard"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Jobs"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="format-list-bulleted"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Casas"
        component={HomesStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="People"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="person"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
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
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigation;

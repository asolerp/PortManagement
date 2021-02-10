import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import HomesStack from './HomesStack';
import JobsStack from './JobsStack';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tabs = AnimatedTabBarNavigator();

const TabNavigation = () => {
  const getTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'NewJob') {
      return false;
    }
    return true;
  };

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#126D9B',
        tabStyle: {marginBottom: 20},
      }}
      appearence={{
        floating: false,
        shadow: false,
        tabBarBackground: 'transparent',
      }}>
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="dashboard"
              size={size ? size : 24}
              color={focused ? color : 'white'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Trabajos"
        component={JobsStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="format-list-bulleted"
              size={size ? size : 24}
              color={focused ? color : 'white'}
              focused={focused}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="Casas"
        component={HomesStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : 'white'}
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
              color={focused ? color : 'white'}
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
              color={focused ? color : 'white'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigation;

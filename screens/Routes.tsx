import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ActivityHistory from './ActivityHistory';
import NewActivityType from './activity_types/NewActivityType';
import HomeScreen from './HomeScreen';
import NewEntryScreen from './NewEntry';
import Settings from './Settings';
import { HomeParamList } from './types';

const HomeNavigator = createStackNavigator<HomeParamList>();
function Routes() {
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="AddEntry"
        component={NewEntryScreen}
        options={{ headerBackTitle: 'Back', title: 'New Activity' }}
      />
      <HomeNavigator.Screen
        name="Settings"
        component={Settings}
        options={{ headerBackTitle: 'Back' }}
      />
      <HomeNavigator.Screen
        name="ActivityHistory"
        component={ActivityHistory}
        options={{ headerBackTitle: 'Back', title: 'Activity History' }}
      />
      <HomeNavigator.Screen
        name="NewActivityType"
        component={NewActivityType}
        options={{
          headerBackTitle: 'Back',
          title: 'New Activity Type',
          presentation: 'modal',
        }}
      />
    </HomeNavigator.Navigator>
  );
}

export default Routes;

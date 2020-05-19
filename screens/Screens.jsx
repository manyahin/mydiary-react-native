import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Write from './Write';
import Login from './Login';
import Read from './Read';
import Menu from './Menu';
import Calendar from './Calendar';
import Settings from './Settings';

import { AuthContext } from '../stores/auth';
import { ConfigContext } from '../stores/config';
import About from './About';

import * as theme from '../util/theme';

const RootStack = createStackNavigator();

const navigationOptions = {
  headerMode: 'none',
};

function renderScreen(offlineMode, userToken) {
  
  if (!offlineMode && !userToken) {
    return (
      <RootStack.Navigator initialRouteName="Login" {...navigationOptions}>
        <RootStack.Screen name="Login" component={Login} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator initialRouteName="Write" {...navigationOptions}>
      <RootStack.Screen name="Write" component={Write} />
      <RootStack.Screen name="Read" component={Read} />
      <RootStack.Screen name="Menu" component={Menu} />
      <RootStack.Screen name="Calendar" component={Calendar} />
      <RootStack.Screen name="Settings" component={Settings} />
      <RootStack.Screen name="About" component={About} />
    </RootStack.Navigator>
  )
}

export default function Screens() {
  const { state } = React.useContext(AuthContext);
  const { config } = React.useContext(ConfigContext);

  return (
    <View style={theme.fullScreen}>
      <NavigationContainer>{renderScreen(config.offlineMode, state.userToken)}</NavigationContainer>
    </View>
  );
};

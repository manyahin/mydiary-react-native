import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WriteScreen from './Write';
import LoginScreen from './Login';
import ReadScreen from './Read';
import MenuScreen from './Menu';
import CalendarScreen from './Calendar';
import SettingsScreen from './Settings';

import { AuthContext } from '../stores/auth';
import { ConfigContext } from '../stores/config';

const RootStack = createStackNavigator();

function renderScreen(offlineMode, userToken) {
  
  if (!offlineMode && !userToken) {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Login" component={LoginScreen} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Write" component={WriteScreen} />
      <RootStack.Screen name="Read" component={ReadScreen} />
      <RootStack.Screen name="Menu" component={MenuScreen} />
      <RootStack.Screen name="Calendar" component={CalendarScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
      padding: 10
  }
});

export default function Screens() {
  const { state } = React.useContext(AuthContext);
  const { config } = React.useContext(ConfigContext);

  return (
    <View style={styles.container}>
      <NavigationContainer>{renderScreen(config.offlineMode, state.userToken)}</NavigationContainer>
    </View>
  );
};

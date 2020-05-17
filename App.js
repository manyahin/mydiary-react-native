import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import * as Font from 'expo-font';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WriteScreen from './screens/WriteScreen';
import LoginScreen from './screens/LoginScreen';
import ReadScreen from './screens/ReadScreen';
import SplashScreen from './screens/SplashScreen';
import SettingsScreen from './screens/SettingsScreen';

import AuthContext from './AuthContext';
import config from './config';

axios.defaults.baseURL = config.db.uri;
// axios.defaults.headers.common['Authorization'] = auth.getToken()
// axios.defaults.headers.post['Content-Type'] = 'application/json'

const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      const loadFonts = async () => {
        try {
          await Font.loadAsync({
              CaveatRegular: require('./assets/fonts/Caveat-Regular.ttf'),
              CaveatBold: {
                  uri: require('./assets/fonts/Caveat-Bold.ttf'),
                  fontDisplay: Font.FontDisplay.BLOCK
              }
          });
        } catch (err) {
            console.error('Error loading the font: ' + err);
        }
      }

      await loadFonts();

      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@user_token');
        console.log('UserToken: ' + userToken)
      } catch (e) {
        // Restoring token failed
        console.error(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (userToken) => {
        await AsyncStorage.setItem('@user_token', userToken);
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('@user_token');
        dispatch({ type: 'SIGN_OUT' });
      },
      // signUp: async data => {
      //   // In a production app, we need to send user data to server and get a token
      //   // We will also need to handle errors if sign up failed
      //   // After getting token, we need to persist the token using `AsyncStorage`
      //   // In the example, we'll use a dummy token

      //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      // },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="Write" component={WriteScreen} />
              <Stack.Screen name="Read" component={ReadScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

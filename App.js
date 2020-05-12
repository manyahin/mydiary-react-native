import React from 'react';
import { Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import WriteScreen from './screens/WriteScreen';
import LoginScreen from './screens/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from './AuthContext';

import axios from 'axios';

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
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@user_key');
        console.log('UserToken: ' + userToken)
      } catch (e) {
        console.error(e);
        // Restoring token failed
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
        signIn: async (email, password) => {

          // console.log('Sign in! ' + data)
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token

            if (email && password) {
              axios.post('http://localhost:3000/api/Customers/login', {
                email,
                password
              })
                  .then(async data => {
                      console.log('You are login')

                      // console.log(data.data.id)
                      // await AsyncStorage.setItem('@user_key', data.data.id)
                      // console.log('key stored in storage')
  
                      // navigation.navigate('Write')
  
                      // signIn({ username, password })

                      dispatch({ type: 'SIGN_IN', token: data.data.id });
                  })
                  .catch(error => {
                      // todo: how to get a error.message value?
                      // setErrorMessage('Wrong credentials')
                      // hide message after 1 second
                      // setTimeout(() => setErrorMessage(false), 2000);

                      console.error(error);
                  })
            } else {
              console.log('fill the credentials')
            }

            // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    // return <SplashScreen />;
    return <Text>Loading...</Text>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Write" component={WriteScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

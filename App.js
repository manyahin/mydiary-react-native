import React from 'react';
import * as Font from 'expo-font';
import axios from 'axios';

import SplashScreen from './screens/Splash';
import { AuthContextProvider } from './stores/auth';
import { ConfigContextProvider } from './stores/config';

import ConfigFile from './config';
import Screens from './screens/Screens'

axios.defaults.baseURL = ConfigFile.db.uri;
// axios.defaults.headers.common['Authorization'] = auth.getToken()
// axios.defaults.headers.post['Content-Type'] = 'application/json'

export default function App() {

  const [ready, setReady] = React.useState(false);

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
      setReady(true);
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContextProvider>
      <ConfigContextProvider>
        {ready ? (
          <Screens />
        ) : (
          <SplashScreen />
        )}
      </ConfigContextProvider>
    </AuthContextProvider>
  );
}

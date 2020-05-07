import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

// storeData = async () => {
//   try {
//     await AsyncStorage.setItem('@storage_Key', 'stored value')
//   } catch (e) {
//     console.error('Error while saving a value to storage')
//   }
// }

// getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@storage_Key')
//     if(value !== null) {
//       // value previously stored
//     }
//   } catch(e) {
//     console.error('Error while getting a value from storage')
//   }
// }

const DisplayErrorMessage = (props) => {
  if (props.errorMessage)
    return <Text style={{color: 'red', paddingBottom: 20}}>
      {props.errorMessage}
    </Text>

  return null
}

export default function App() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(false);

  const loginFn = () => {
    if (email && password) {
      axios.post('http://localhost:3000/api/Customers/login', {
        email,
        password
      })
        .then(async data => {
          console.log('You are login')
          // console.log(data.data.id)
          await AsyncStorage.setItem('@app_key', data.data.id)
          console.log('key stored in storage')
        })
        .catch(error => {
          // todo: how to get a error.message value?
          setErrorMessage('Wrong credentials')
          // hide message after 1 second
          setTimeout(() => setErrorMessage(false), 2000);
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDiary</Text>
      <Text style={styles.label}>Enter your credentials</Text>
      <DisplayErrorMessage errorMessage={errorMessage}/>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text>Password:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      <Button
        onPress={() => loginFn()}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40
  }
});

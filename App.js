import React from 'react';
import { StyleSheet, Button, Text, TextInput, View, Alert } from 'react-native';

export default function App() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const loginFn = () => {
    if (email && password) {
      console.log('Good one!')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDiary</Text>
      <Text style={styles.label}>Enter your details</Text>
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
    marginBottom: 40
  }
});

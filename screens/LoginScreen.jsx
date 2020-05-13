import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import AuthContext from '../AuthContext';

import axios from 'axios';

const DisplayErrorMessage = (props) => {
    if (props.errorMessage)
        return (
            <Text style={{ color: 'red', paddingBottom: 20 }}>
                {props.errorMessage}
            </Text>
        );

    return null
}

export default function LoginScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(null);

    const { signIn } = React.useContext(AuthContext);

    const setError = () => {
        setErrorMessage('Wrong credentials')
        // hide message after 1 second
        setTimeout(() => setErrorMessage(null), 2000);
    }

    const login = (email, password) => {
        if (email && password) {
            axios.post('Customers/login', {
                email,
                password
            })
                .then(async data => {
                    console.log('You are login!')
                    const userToken = data.data.id;
                    signIn(userToken);
                })
                .catch(error => {
                    // todo: how to get a error.message value?
                    console.error(error);
                    setError('Credebtials are wrong!')
                })
        } else {
            setError('Fill the credentials!')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MyDiary</Text>
            <Text style={styles.label}>Enter your credentials</Text>
            <DisplayErrorMessage errorMessage={errorMessage} />
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
                onPress={() => login(email, password)}
                title="Login"
                color="#841584"
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

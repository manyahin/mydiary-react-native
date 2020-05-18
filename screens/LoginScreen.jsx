import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import axios from 'axios';

import AuthContext from '../contexts/AuthContext';

const DisplayErrorMessage = (props) => {
    if (props.errorMessage)
        return (
            <Text style={styles.errorMessage}>
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

    const setError = (message) => {
        setErrorMessage(message);
        // hide message after 1 second
        setTimeout(() => setErrorMessage(null), 2000);
    }

    const login = (email, password) => {
        axios.post('Customers/login', {
            email,
            password
        })
            .then(data => signIn(data.data.id))
            .catch(error => {
                setError('Credentials are wrong!')
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>MyDiary</Text>
            <DisplayErrorMessage errorMessage={errorMessage} />
            <Input
                placeholder='Email'
                onChangeText={text => onChangeEmail(text)}
                // returnKeyType="Next"
                // autoCompleteType="email" // web bug
                value={email}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={text => onChangePassword(text)}
                value={password}
            />
            <Button
                onPress={() => login(email, password)}
                title="Sign In"
                style={styles.button}
                disabled={!(email && password)}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 45,
        fontFamily: 'CaveatRegular'
    },
    button: {
        marginTop: 30,
        width: 100
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        paddingBottom: 20,
        fontSize: 16
    }
});

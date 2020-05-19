import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import axios from 'axios';

import { AuthContext } from '../stores/auth';
import { DisplayMessage } from '../components/DisplayMessage';

export default function LoginScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [notificationOptions, setNotification] = React.useState(null);

    const { signIn } = React.useContext(AuthContext);

    const setError = (message) => {
        setErrorMessage(message);
        // hide message after 1 second
        setTimeout(() => setErrorMessage(null), 2000);
    }

    const setErrorNotification = (message) => {
        setNotification(prevState => {
            return {
                ...prevState,
                message,
                type: 'error'
            }
        });

        // hide a message after 1 second
        setTimeout(() => setNotification(null), 2000);
    }

    const login = (email, password) => {
        axios.post('Customers/login', {
            email,
            password
        })
            .then(data => signIn(data.data.id))
            .catch(error => {
                setErrorNotification('Credentials are wrong!')
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>MyDiary</Text>
            <DisplayMessage 
                options={notificationOptions}
            />  
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
    }
});

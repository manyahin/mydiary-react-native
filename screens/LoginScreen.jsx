import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import AuthContext from '../AuthContext';

const DisplayErrorMessage = (props) => {
    if (props.errorMessage)
        return <Text style={{ color: 'red', paddingBottom: 20 }}>
            {props.errorMessage}
        </Text>

    return null
}

export default function LoginScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(false);

    const { signIn } = React.useContext(AuthContext);

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
                onPress={() => signIn(email, password)}
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
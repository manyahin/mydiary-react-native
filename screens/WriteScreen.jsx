import React, { useEffect } from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';

import AuthContext from '../AuthContext';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

function Note({ note }) {
    return (
        <View style={{marginTop: 5, marginBottom: 5}}>
            <Text>{note.created_at}</Text>
            <Text>{note.body}</Text>
        </View>
    );
}

export default function WriteScreen() {

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState([]);

    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        getLastNotes();
    }, []);

    const writeMessage = async () => {
        const note = {}
        note.created_at = new Date()
        note.body = message

        const userToken = await AsyncStorage.getItem('@user_token');

        axios.post('Notes', note, {
            headers: { 'Authorization': userToken }
        })
            .then(async data => {
                console.log('You wrote a note!')
                setMessage('');
                getLastNotes();
            })
            .catch(error => {
                console.error(error);
            })
    }

    const getLastNotes = async () => {
        const userToken = await AsyncStorage.getItem('@user_token');

        axios.get(`Notes?filter=${JSON.stringify({ order: `created_at desc`, limit: 10 })}`, {
            headers: { 'Authorization': userToken }
        })
            .then(data => {
                console.log(data);
                setNotes(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topbar}>
                <Text>Write Screen</Text>
                <Button
                    onPress={() => signOut()}
                    title="logout"
                />
            </View>
            <View>
                <TextInput style={styles.textarea}
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
                <Button
                    onPress={() => writeMessage()}
                    title="Write"
                />
            </View>
            <View>
                <FlatList
                    data={notes}
                    renderItem={({ item }) => <Note note={item}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    topbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 30,
        marginBottom: 10
    },
    textarea: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5
    }
});

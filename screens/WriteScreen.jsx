import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';
import moment from 'moment';

import AuthContext from '../AuthContext';

import { AsyncStorage } from 'react-native';

import axios from 'axios';

function Note({ note }) {
    return (
        <View style={{marginBottom: 10}}>
            <Text style={{color: 'grey'}}>{moment(new Date(note.created_at)).format("dddd, MMM Do YY, HH:mm")}</Text>
            <Text style={{fontSize: 16, paddingTop: 5}}>{note.body}</Text>
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
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.logo}>MyDiary</Text>
                <Button
                    onPress={() => signOut()}
                    title="Sign Out"
                    type="clear"
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

            <FlatList
                data={notes}
                renderItem={({ item }) => <Note note={item}/>}
                keyExtractor={item => item.id}
                style={{marginTop: 20}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10  
    },
    logo: {
        fontSize: 17, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        paddingTop: 13, 
        paddingLeft: 2, 
        color: 'black'
    },
    textarea: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        height: 100 
    }
});

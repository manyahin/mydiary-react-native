import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import NotesList from '../components/NotesList';
import TopBar from '../components/TopBar';

import { ConfigContext } from '../stores/config';
import { DbContext } from '../stores/db';
import { DisplayMessage } from '../components/DisplayMessage';

import * as theme from '../util/theme';

export default function WriteScreen({ navigation }) {

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState([]);
    const [notificationOptions, setNotification] = React.useState(null);

    const { config } = React.useContext(ConfigContext);
    const Db = React.useContext(DbContext);

    const getLastNotes = () => {
        Db.getNotes('desc', 10)
            .then(setNotes)
            .catch(error => console.error(error));
    };

    const writeMessage = () => {
        if (!message.trim().length) setErrorNotification('You should provide a text');
        else {
            Db.addNote(message)
                .then(data => {
                    const message = `You wrote ${data.count_symbols} chars`;
                    setMessageNotification(message);
                })
                .then(setMessage(''))
                .then(getLastNotes)
                .catch(error => console.error(error));
        }
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

    const setMessageNotification = (message) => {
        setNotification(prevState => {
            return {
                ...prevState,
                message,
                type: 'message'
            }
        });

        // hide a message after 1 second
        setTimeout(() => setNotification(null), 2000);
    } 

    useEffect(() => {
        getLastNotes();
    }, []);

    return (
        <View style={theme.baseContainer}>
            <TopBar />
            <View>
                <TextInput
                    placeholder="What happend?"
                    style={styles.textarea}
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
                <Button
                    onPress={() => writeMessage()}
                    title="Write"
                />
                <DisplayMessage 
                    options={notificationOptions}
                />    
            </View>
            {/* todo: why NotesList get render again when i type into TextInput? 
                and when I move from read to write then the write component the same,
                but when I move from write to read the read component reload
            */}
            {config.displayLastNotes && <NotesList notes={notes} />}
        </View>
    );
}

const styles = StyleSheet.create({
    textarea: {
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 5,
        padding: 5,
        height: 100 
    }
});

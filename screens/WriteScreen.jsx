import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';

import NotesList from '../components/NotesList';
import TopBar from '../components/TopBar';
import NoteModel from '../models/note';

import ConfigContext from '../contexts/ConfigContext';

export default function WriteScreen({ navigation }) {

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState([]);

    const { config } = React.useContext(ConfigContext);

    useEffect(() => {
        const boot = async () => {
            setNotes(await NoteModel.getNotes('desc', 10));
        }

        boot();
    }, []);

    const writeMessage = async () => {
        await NoteModel.addNote(message);
        setMessage('');
        setNotes(await NoteModel.getNotes('desc', 10));
    }

    return (
        <View style={styles.container}>
            <TopBar />
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
            {/* todo: why NotesList get render again when i type into TextInput? 
                and when I move from read to write then the write component the same,
                but when I move from write to read the read component reload
            */}
            {config.displayLastNotes && <NotesList notes={notes} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    textarea: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        height: 100 
    }
});

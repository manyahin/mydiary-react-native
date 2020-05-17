import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';

import AuthContext from '../AuthContext';

import NotesList from '../components/NotesList';

import NoteModel from '../models/note';

export default function WriteScreen({ navigation }) {

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState([]);

    const { signOut } = React.useContext(AuthContext);

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
            <View style={styles.topbar}>
                <Text style={styles.logo}>MyDiary</Text>
                <Button
                    onPress={() => signOut()}
                    title="Sign Out"
                    type="clear"
                />
                <Button
                    onPress={() => navigation.navigate('Read')}
                    title="Read"
                    type="clear"/>
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
            {/* todo: why NotesList get render again when i type into TextInput? 
                and when I move from read to write then the write component the same,
                but when I move from write to read the read component reload
            */}
            <NotesList notes={notes} />
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
        marginTop: 10,
        marginBottom: 10 
    },
    logo: {
        fontSize: 20, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        paddingTop: 13, 
        paddingLeft: 2, 
        color: 'black',
        fontFamily: 'CaveatRegular'
    },
    textarea: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        height: 100 
    }
});

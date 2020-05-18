import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import NotesList from '../components/NotesList';
import TopBar from '../components/TopBar';
import NoteModel from '../models/note';

export default function ReadScreen({ navigation }) {
    const [notes, setNotes] = React.useState([]);

    useEffect(() => {
        const boot = async () => {
            setNotes(await NoteModel.getNotes());
        }

        boot();
    }, []);

    return (
        <View style={styles.container}>
            <TopBar/>
            <View>
                {/* <Text h4>Read Screen</Text> */}
                <NotesList notes={notes}></NotesList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        padding: 10
    }
});


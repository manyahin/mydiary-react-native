import React, { useEffect } from 'react';
import { View } from 'react-native';

import NotesList from '../components/NotesList';
import TopBar from '../components/TopBar';
import { DbContext } from '../stores/db';
import { ScrollView } from 'react-native-gesture-handler';

import * as theme from '../util/theme';

export default function ReadScreen({ route, navigation }) {

    const [notes, setNotes] = React.useState([]);

    const Db = React.useContext(DbContext);

    useEffect(() => {
        const boot = async () => {
            if (route && route.params) {
                const { day } = route.params;
                setNotes(await Db.getNotesForSpecificDay(day));
            } else {
                setNotes(await Db.getNotes());
            }
        }

        boot();
    }, []);

    return (
        <View style={theme.baseContainer}>
            <TopBar />
            <ScrollView>
                <NotesList notes={notes}></NotesList>
            </ScrollView>
        </View>
    )
}

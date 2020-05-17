import React, { useMemo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

function Note({ note }) {
    const time = moment(note.created_at).format("HH:mm");

    return (
        <View style={styles.note}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.body}>{note.body}</Text>
        </View>
    );
}

function DayNotes({ day, notes }) {
    return (
        <View>
            <Text style={styles.day}>{day.format("dddd, MMM Do YY")}</Text>
            <FlatList
                data={notes}
                renderItem={({ item }) => <Note note={item}></Note>}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default function NotesList({ notes }) {
    // todo: should I use useMemo ?
    const groupedNotesByDay = (() => {
        console.log('count')
        return notes.reduce((acc, note) => {
            let day = moment(note.created_at);
            day.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

            let index = acc.findIndex(dayNotes => dayNotes.day.isSame(day));
            if (index != -1) {
                acc[index].notes.push(note);
            } else {
                acc.push({ index: day.toISOString(), day, notes: [note] });
            }

            return acc;
        }, []);
    })();

    return (
        <FlatList
            data={groupedNotesByDay}
            renderItem={({ item }) => <DayNotes day={item.day} notes={item.notes}></DayNotes>}
            keyExtractor={item => item.index}
            style={{ marginTop: 20 }}
        />
    );
}

const styles = StyleSheet.create({
    note: {
        marginBottom: 10
    },
    date: {
        color: 'grey'
    },
    day: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    time: {
        color: 'grey'
    },
    body: {
        fontSize: 16,
        paddingTop: 5
    }
});

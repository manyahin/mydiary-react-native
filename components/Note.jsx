import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

export default function Note({ note }) {
    const date = new Date(note.created_at);
    
    return (
        <View style={styles.note}>
            <Text style={styles.date}>
                {moment(date).format("dddd, MMM Do YY, HH:mm")}
            </Text>
            <Text style={styles.body}>{note.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    note: {
        marginBottom: 10
    },
    date: {
        color: 'grey'
    },
    body: {
        fontSize: 16, 
        paddingTop: 5
    }
});

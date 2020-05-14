import React from 'react';
import { FlatList } from 'react-native';

import Note from './Note';

export default function NotesList({ notes }) {
    return (
        <FlatList
            data={notes}
            renderItem={({ item }) => <Note note={item}/>}
            keyExtractor={item => item.id}
            style={{marginTop: 20}}
        />
    );
}

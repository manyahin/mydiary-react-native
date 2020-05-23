import { v1 as uuidv1 } from 'react-native-uuid';
import { AsyncStorage } from 'react-native';

export default {
    addNote: async (body) => {
        const note = {};
        note.id = uuidv1();
        note.created_at = new Date();
        note.body = body;

        try {
            const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

            notes.push(note);

            await AsyncStorage.setItem('@notes', JSON.stringify(notes));
        }
        catch (err) {
            console.error('Error while adding new note', err);
        }

        return {
            ...note,
            count_symbols: note.body.length
        }
    },
    getNotes: async (sort = 'asc', limit = 50) => {
        const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

        if (sort === 'asc') {
            notes.sort((noteA, noteB) => noteA.created_at > noteB.created_at );
        } else if (sort === 'desc') {
            notes.sort((noteA, noteB) => noteA.created_at < noteB.created_at );
        }

        return notes;
    },
    // probably you don't want to call it
    deleteAllNotes: async () => {
        try {
            await AsyncStorage.removeItem('@notes');
        }
        catch (err) {
            console.error('Error while deleting notes', err);
        }
    }
};

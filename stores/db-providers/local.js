import { v1 as uuidv1 } from 'react-native-uuid';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

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
            notes.sort((noteA, noteB) => noteA.created_at > noteB.created_at);
        } else if (sort === 'desc') {
            notes.sort((noteA, noteB) => noteA.created_at < noteB.created_at);
        }

        return notes.slice(0, limit);
    },
    // probably you don't want to call it
    deleteAllNotes: async () => {
        try {
            await AsyncStorage.removeItem('@notes');
        }
        catch (err) {
            console.error('Error while deleting notes', err);
        }
    },
    getOnlyNotesDates: async () => {
        const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];
        return notes.map(({created_at}) => ({created_at}));
    },
    getNotesForSpecificDay: async (day) => {
        const startOfDay = moment(day).startOf('day');
        const endOfDay = moment(day).endOf('day');

        const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

        return notes.filter(note => {
            const date = moment(note.created_at);
            return date > startOfDay && date < endOfDay;
        });
    },
    searchNotes: async (text) => {
        const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];
        return notes.filter(note => note.body.includes(text));
    }
};

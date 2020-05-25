import { AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default {
    addNote: async (body) => {
        const note = {};
        note.created_at = new Date();
        note.body = body;

        const userToken = await AsyncStorage.getItem('@user_token');

        try {
            const data = await axios.post('Notes', note, {
                headers: { 'Authorization': userToken }
            })

            return data.data;
        }
        catch (err) {
            console.error(err);

            return [];
        }
    },
    getNotes: async (sort = 'asc', limit = 50) => {
        const userToken = await AsyncStorage.getItem('@user_token');

        const url = `Notes?filter=${JSON.stringify({ order: `created_at ${sort}`, limit })}`;

        try {
            const data = await axios.get(url, {
                headers: { 'Authorization': userToken }
            })

            return data.data;
        }
        catch (err) {
            console.error(err);

            return [];
        }
    },
    deleteAllNotes: async () => { },
    getOnlyNotesDates: async () => {
        const userToken = await AsyncStorage.getItem('@user_token');

        const filter = {
            fields: {
                created_at: true
            },
            order: 'created_at ASC'
        };

        try {
            const { data } = await axios.get('Notes?filter=' + JSON.stringify(filter), {
                headers: { 'Authorization': userToken }
            });

            return data;
        }
        catch (err) {
            console.error(err);

            return [];
        }
    },
    getNotesForSpecificDay: async (day) => {
        const userToken = await AsyncStorage.getItem('@user_token');

        const startOfDay = moment(day).startOf('day');
        const endOfDay = moment(day).endOf('day');

        const filter = {
            where: {
                and: [
                    {
                        created_at: {
                            gte: startOfDay.toISOString()
                        }
                    },
                    {
                        created_at: {
                            lte: endOfDay.toISOString()
                        }
                    }
                ]
            },
            order: 'created_at ASC'
        }

        let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter), {
            headers: { 'Authorization': userToken }
        });

        return data;
    },
    searchNotes: async (text) => {
        const userToken = await AsyncStorage.getItem('@user_token');

        const filter = {
            where: {
                '$text': {
                    search: text
                }
            }
        }

        let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter), {
            headers: { 'Authorization': userToken }
        });

        return data;
    },
    favoriteNote: async (text) => {
        
    }
};

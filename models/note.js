import { AsyncStorage } from 'react-native';
import axios from 'axios';

export default {
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
    addNote: async (body) => {
        const note = {};
        note.created_at = new Date();
        note.body = body;

        const userToken = await AsyncStorage.getItem('@user_token');

        try {
            const data = axios.post('Notes', note, {
                headers: { 'Authorization': userToken }
            })

            console.log(data);

            return data.data;
        }
        catch (err) {
            console.error(err);

            return [];
        }
    }
}

import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { v1 as uuidv1 } from 'react-native-uuid';

import { ConfigContext } from './config';

export const DbContext = React.createContext();

const remoteDBProvider = {
  getNotes: async (sort = 'asc', limit = 50) => {
    const userToken = await AsyncStorage.getItem('@user_token');

    const filter = { order: `created_at ${sort}`, limit };
    const url = `Notes?filter=${JSON.stringify(filter)}`;

    try {
      const { data } = await axios.get(url, {
        headers: { 'Authorization': userToken }
      })

      return data;
    }
    catch (err) {
      console.error(err);

      return [];
    }
  },
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
  addNote: async (body) => {
    const note = {};
    note.created_at = new Date();
    note.body = body;

    const userToken = await AsyncStorage.getItem('@user_token');

    try {
      const { data } = await axios.post('Notes', note, {
        headers: { 'Authorization': userToken }
      })

      return data;
    }
    catch (err) {
      console.error(err);

      return [];
    }
  },
  deleteAllNotes: async () => {
    // realize me please
    return {};
  },
};

const localDbProvider = {
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
  getNotes: async () => {
    const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

    return notes;
  },
  getOnlyNotesDates: async () => {
    // realize me please
    return {};
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

export function DbContextProvider({ children }) {

  const { config } = React.useContext(ConfigContext);

  let dbContext;

  if (config.offlineMode) {
    dbContext = localDbProvider;
  } else {
    dbContext = remoteDBProvider;
  }

  return (
    <DbContext.Provider value={dbContext}>
      {children}
    </DbContext.Provider>
  );
};

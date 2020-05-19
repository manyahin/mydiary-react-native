import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { v1 as uuidv1 } from 'react-native-uuid';

import { ConfigContext } from './config';

export const DbContext = React.createContext();

const remoteDBProvider = {
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
      const data = await axios.post('Notes', note, {
        headers: { 'Authorization': userToken }
      })

      return data.data;
    }
    catch (err) {
      console.error(err);

      return [];
    }
  }
};

const localDbProvider = {
  addNote: async (body) => {
    console.log('add note');

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
      'status': 'success',
      'messageLength': note.body.length
    }
  },
  getNotes: async () => {
    
    console.log('get notes');

    const notes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

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

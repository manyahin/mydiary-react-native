import React from 'react';

import { ConfigContext } from './config';

import localDbProvider from './db-providers/local';
import remoteDbProvider from './db-providers/remote';

export const DbContext = React.createContext();

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

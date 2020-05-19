import React from 'react';

import ConfigFile from '../config';

export const ConfigContext = React.createContext();

export function ConfigContextProvider({ children }) {
  const [config, setConfig] = React.useState(ConfigFile);

  const configContext = {
    config,
    updateConfig: (obj) => {
      setConfig({...config, ...obj});
    }
  };

  return (
    <ConfigContext.Provider value={configContext}>
      {children}
    </ConfigContext.Provider>
  );
};

import React, { createContext, useState } from 'react';

export const ParamContext = createContext();

export const ParamProvider = ({ children }) => {
  const [param, setParam] = useState(null);

  return (
    <ParamContext.Provider value={{ param, setParam }}>
      {children}
    </ParamContext.Provider>
  );
};
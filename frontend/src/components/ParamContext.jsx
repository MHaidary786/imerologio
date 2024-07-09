import React, { createContext, useState } from 'react';

export const ParamContext = createContext();

export const ParamProvider = ({ children }) => {
  const [param, setParam] = useState(null);

  const updateParam = (newParam) => {
    setParam(newParam);
  };

  return (
    <ParamContext.Provider value={{ param, updateParam, setParam  }}>
      {children}
    </ParamContext.Provider>
  );
};
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [debugMode, setDebugMode] = useState(true); // Initial debugMode value

  return (
    <AppContext.Provider value={{ debugMode, setDebugMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

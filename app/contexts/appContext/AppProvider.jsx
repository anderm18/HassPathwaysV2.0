"use client";

import { createContext, useContext, useReducer } from "react";
import { appReducer } from "./AppReducer";

const appInitialState = {};

const AppContext = createContext(appInitialState);

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  // Declare any state fucntion here
  // and pass through value props in AppContext.Provider

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;

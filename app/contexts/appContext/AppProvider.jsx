"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { appReducer } from "./AppReducer";
import { SET_CATALOG } from "../actions";
import {
  courseState,
  pathwaysCategories,
  APPLICATION_STATE_KEY,
} from "@/public/data/staticData";

const constantApplicationValue = { courseState, pathwaysCategories };

const defaultInitialState = {
  catalog_year: 2023,
  // all course with status
};

const getInitialState = () => {
  const initialState = localStorage.getItem(APPLICATION_STATE_KEY);
  return initialState ? JSON.parse(initialState) : defaultInitialState;
};

const AppContext = createContext(getInitialState());

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  // Update localStorage
  useEffect(() => {
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(state));
  }, [state]);

  // Declare any state function here
  // and pass through value props in AppContext.Provider
  const setCatalog = (catalog_year) => {
    dispatch({ type: SET_CATALOG, payload: catalog_year });
  };

  return (
    <AppContext.Provider
      value={{ ...state, ...constantApplicationValue, setCatalog }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;

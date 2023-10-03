"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { appReducer } from "./AppReducer";
import { INITIAL_LOAD_DATA, SET_CATALOG } from "../actions";
import {
  courseState,
  pathwaysCategories,
  APPLICATION_STATE_KEY,
} from "@/public/data/staticData";
import { ApplicationContext } from "@/app/model/AppContextInterface";

const constantApplicationValue = { courseState, pathwaysCategories };

const defaultInitialState: ApplicationContext = {
  catalog_year: 2023,
  // TODO: all course with status
  setCatalog: () => {},
  ...constantApplicationValue,
};

const getInitialState: () => ApplicationContext = () => {
  const initialState = localStorage.getItem(APPLICATION_STATE_KEY) ?? "";
  return JSON.parse(initialState) ?? defaultInitialState;
};

const AppContext = createContext<ApplicationContext>(getInitialState());

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  // Get data from localStorage
  useEffect(() => {
    dispatch({ type: INITIAL_LOAD_DATA, payload: getInitialState() });
  }, []);

  // Update localStorage
  useEffect(() => {
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(state));
  }, [state]);

  // Declare any state function here
  // and pass through value props in AppContext.Provider
  const setCatalog = (catalog_year: number) => {
    dispatch({ type: SET_CATALOG, payload: catalog_year });
  };

  return (
    <AppContext.Provider value={{ ...state, setCatalog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;

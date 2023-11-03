"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { appReducer } from "./AppReducer";
import { INITIAL_LOAD_DATA, SET_CATALOG, SET_COURSE_STATE} from "../actions";
import {
  courseState,
  pathwaysCategories,
  APPLICATION_STATE_KEY,
} from "@/public/data/staticData";
import { ApplicationContext } from "@/app/model/AppContextInterface";

const constantApplicationValue = { courseState, pathwaysCategories };

const defaultInitialState: ApplicationContext = {
  catalog_year: 2023,
  course_value: 5,
  // TODO: all course with status
  setCourseState: () => {},
  ...constantApplicationValue,
  setCatalog: () => {},
  ...constantApplicationValue,
};

const getInitialState: () => ApplicationContext = () => {
  const initialState = localStorage.getItem(APPLICATION_STATE_KEY);
  return initialState ? JSON.parse(initialState) : defaultInitialState;
};

const AppContext = createContext<ApplicationContext>(defaultInitialState);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, defaultInitialState);

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
  
  const setCourseState = (course_value: number) => {
    dispatch({ type: SET_COURSE_STATE, payload: course_value });
  };

  return (
    <AppContext.Provider value={{ ...state, setCatalog, setCourseState }}>
      {children}
    </AppContext.Provider>
  );

};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;

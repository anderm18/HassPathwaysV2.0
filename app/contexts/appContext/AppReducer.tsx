import {
  ApplicationContext,
  ApplicationDispatch,
} from "@/app/model/AppContextInterface";
import { INITIAL_LOAD_DATA, SET_CATALOG, SET_COURSE_STATE} from "../actions";

export const appReducer: (
  state: ApplicationContext,
  action: ApplicationDispatch
) => ApplicationContext = (
  state: ApplicationContext,
  action: ApplicationDispatch
) => {
  switch (action.type) {
    case INITIAL_LOAD_DATA:
      return action.payload;
    case SET_CATALOG:
      return {
        ...state,
        catalog_year: action.payload,
      };
    case SET_COURSE_STATE:
        return {
          ...state,
          course_value: action.payload, // Update the course_value
      };
      
    default:
      return state;
  }
};

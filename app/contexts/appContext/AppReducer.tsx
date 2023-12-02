import {
  ApplicationContext,
  ApplicationDispatch,
} from "@/app/model/AppContextInterface";
import { INITIAL_LOAD_DATA, SET_CATALOG, SET_COURSE_STATE } from "../actions";

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
      // TODO: create a new mycourses array
      let newMyCourse = [...state.myCourses];

      // TODO: replace the course's old state with the new one

      // TODO: return the updated store, with new mycourses array
      return {
        ...state,
        myCourse: newMyCourse,
      };
    default:
      return state;
  }
};

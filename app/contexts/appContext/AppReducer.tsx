// AppReducer.ts

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
      let newMyCourses = [...state.myCourses];

      // TODO: find the index of the course you want to update (replace 'courseId' with the actual identifier)
      const courseIndex = newMyCourses.findIndex(
        (course) => course.id === action.payload.courseId
      );

      // TODO: make the necessary changes to the course (replace 'newCourseState' with the actual new state)
      newMyCourses[courseIndex] = {
        ...newMyCourses[courseIndex],
        ...action.payload.newCourseState,
      };

      // TODO: return the updated store, with new mycourses array
      return {
        ...state,
        myCourses: newMyCourses,
      };

    default:
      return state;
  }
};

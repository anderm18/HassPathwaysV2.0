import {
  ApplicationContext,
  ApplicationDispatch,
} from "@/app/model/AppContextInterface";
import { INITIAL_LOAD_DATA, SET_CATALOG } from "../actions";

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
    default:
      return state;
  }
};

import { INITIAL_LOAD_DATA, SET_CATALOG } from "../actions";

export const appReducer = (state, action) => {
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

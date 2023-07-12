import { SET_CATALOG } from "../actions";

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_CATALOG:
      return {
        ...state,
        catalog_year: action.payload,
      };
    default:
      return state;
  }
};

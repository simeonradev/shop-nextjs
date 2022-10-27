import { SEARCH_TERM } from "./actions";

const initialState = { searchTerm: "" };

export const searchTermReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return { searchTerm: action.data };

    default:
      return state;
  }
};

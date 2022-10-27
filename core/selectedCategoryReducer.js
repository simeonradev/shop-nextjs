import { SELECTED_CATEGORY } from "./actions";

const initialState = { selectedCategory: "" };

export const selectedCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return { selectedCategory: action.data };

    default:
      return state;
  }
};

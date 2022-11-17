import { RECENTLY_VIEWED } from "./actions";

const initialState = [];

export const recentlyViewed = (state = initialState, action) => {
  switch (action.type) {
    case RECENTLY_VIEWED:
      const isItemRecentlyViewed = state.find(
        (itemId) => itemId === action.data
      );
      console.log(isItemRecentlyViewed);
      return isItemRecentlyViewed ? state : [...state, action.data];

    default:
      return state;
  }
};

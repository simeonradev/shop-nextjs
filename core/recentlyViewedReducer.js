import { RECENTLY_VIEWED } from "./actions";

const initialState = { recentlyViewedArray: [] };

export const recentlyViewedReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECENTLY_VIEWED:
      const isItemRecentlyViewed = state.recentlyViewedArray.find(
        (itemId) => itemId === action.data
      );
      return {
        recentlyViewedArray: isItemRecentlyViewed
          ? state.recentlyViewedArray
          : [...state.recentlyViewedArray, action.data],
      };

    default:
      return state;
  }
};

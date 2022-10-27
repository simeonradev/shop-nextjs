import { configureStore } from "@reduxjs/toolkit";
import { productCartReducer } from "./productCartReducer";
import { productDataReducer } from "./productDataReducer";
import { selectedCategoryReducer } from "./selectedCategoryReducer";
import { searchTermReducer } from "./searchTermReducer";
import { currentUserReducer } from "./currentUserReducer";
import { recentlyViewedReducer } from "./recentlyViewedReducer";
// import { previewModalReducer } from "./previewModalReducer";
import { modalReducer } from "./modalReducer";

export const store = configureStore({
  reducer: {
    productCartReducer,
    productDataReducer,
    selectedCategoryReducer,
    searchTermReducer,
    currentUserReducer,
    recentlyViewedReducer,
    // previewModalReducer,
    modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reducers";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => {
  const store = configureStore({
    reducer: combinedReducers,
    devTools: true,
  });

  return store;
};

export const wrapper = createWrapper(makeStore);

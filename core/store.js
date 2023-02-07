import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reducers";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: combinedReducers,
    devTools: true,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore);

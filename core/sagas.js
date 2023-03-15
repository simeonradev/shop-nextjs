import { takeLatest, call, put } from "redux-saga/effects";
import {
  DELETE_LIKED_PRODUCT,
  DELETE_LIKED_PRODUCT_LOADED,
  DELETE_LIKED_PRODUCT_ERROR,
  GET_LIKED_PRODUCTS,
  GET_LIKED_PRODUCTS_LOADED,
  GET_LIKED_PRODUCTS_ERROR,
  UPDATE_LIKED_PRODUCTS,
  UPDATE_LIKED_PRODUCTS_LOADED,
  UPDATE_LIKED_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_LOADED,
  DELETE_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_LOADED,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_LOADED,
  UPDATE_PRODUCT_ERROR,
} from "./actions";

function* getLikedProducts(action) {
  try {
    const res = yield call(
      fetch,
      "/api/likedProducts?" +
        new URLSearchParams({
          userId: action.data.userId,
        })
    );
    const likedProductsIds = yield res.json();
    yield put({
      type: GET_LIKED_PRODUCTS_LOADED,
      data: likedProductsIds.likedProductsIds,
    });
  } catch (error) {
    yield put({
      type: GET_LIKED_PRODUCTS_ERROR,
      data: "Error",
    });
  }
}

function* updateLikedProducts(action) {
  try {
    yield call(fetch, "/api/likedProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: action.data.id, userId: action.data.userId }),
    });
    yield put({ type: UPDATE_LIKED_PRODUCTS_LOADED, data: action.data.id });
  } catch (error) {
    yield put({ type: UPDATE_LIKED_PRODUCT_ERROR, data: "Error" });
  }
}

function* deleteLikedProduct(action) {
  try {
    yield call(fetch, "/api/likedProducts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: action.data.id, userId: action.data.userId }),
    });
    yield put({ type: DELETE_LIKED_PRODUCT_LOADED, data: action.data.id });
  } catch (error) {
    yield put({ type: DELETE_LIKED_PRODUCT_ERROR, data: "Error" });
  }
}

function* getProducts(action) {
  try {
    const res = yield call(
      fetch,
      "/api/allProducts?" + new URLSearchParams(action.data)
    );
    const allProducts = yield res.json();
    yield put({
      type: GET_PRODUCTS_LOADED,
      data: allProducts.products.products,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_ERROR,
      data: "Error",
    });
  }
}

function* updateProducts(action) {
  try {
    yield call(fetch, "/api/allProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.data),
    });
    yield put({ type: UPDATE_PRODUCTS_LOADED, data: action.data });
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_ERROR, data: "Error" });
  }
}

function* deleteProduct(action) {
  try {
    yield call(fetch, "/api/allProducts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.data),
    });
    yield put({ type: DELETE_PRODUCT_LOADED, data: action.data });
  } catch (error) {
    yield put({ type: DELETE_PRODUCT_ERROR, data: "Error" });
  }
}

export function* rootSaga() {
  yield takeLatest(GET_LIKED_PRODUCTS, getLikedProducts);
  yield takeLatest(UPDATE_LIKED_PRODUCTS, updateLikedProducts);
  yield takeLatest(DELETE_LIKED_PRODUCT, deleteLikedProduct);

  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(UPDATE_PRODUCTS, updateProducts);
  yield takeLatest(DELETE_PRODUCT, deleteProduct);
}

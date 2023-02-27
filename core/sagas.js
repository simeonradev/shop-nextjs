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
  // DELETE_USER,
  // DELETE_USER_LOADED,
  // DELETE_USER_ERROR,
  // GET_USER,
  // GET_USER_LOADED,
  // GET_USER_ERROR,
  // CREATE_USER,
  // CREATE_USER_LOADED,
  // CREATE_USER_ERROR,
  // UPDATE_USER,
  // UPDATE_USER_LOADED,
  // UPDATE_USER_ERROR,
} from "./actions";

function* getLikedProducts() {
  try {
    const res = yield call(fetch, "/api/likedProducts");
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
      body: JSON.stringify({ id: action.data }),
    });
    yield put({ type: UPDATE_LIKED_PRODUCTS_LOADED, data: action.data });
  } catch (error) {
    yield put({ type: UPDATE_LIKED_PRODUCT_ERROR, data: "Error" });
  }
}

function* deleteLikedProduct(action) {
  try {
    yield call(fetch, "/api/likedProducts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: action.data }),
    });
    yield put({ type: DELETE_LIKED_PRODUCT_LOADED, data: action.data });
  } catch (error) {
    yield put({ type: DELETE_LIKED_PRODUCT_ERROR, data: "Error" });
  }
}

// function* getUser(action) {
//   try {
//     const res = yield call(
//       fetch,
//       "/api/user?" +
//         new URLSearchParams({
//           username: action.data.username,
//           password: action.data.password,
//         })
//     );
//     const jsonRes = yield res.json();

//     yield put({
//       type: GET_USER_LOADED,
//       data: jsonRes.user,
//     });
//   } catch (error) {
//     yield put({
//       type: GET_USER_ERROR,
//       data: { error: "Wrong username or password" },
//     });
//   }
// }

// function* createUser(action) {
//   const res = yield call(fetch, "/api/user", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       user: {
//         username: action.data.username,
//         password: action.data.password,
//         name: action.data.name,
//         age: action.data.age,
//         describtion: action.data.describtion,
//       },
//     }),
//   });
//   if (res.status === 201) {
//     const jsonRes = yield res.json();

//     yield put({
//       type: CREATE_USER_LOADED,
//       data: jsonRes.user,
//     });
//   } else {
//     yield put({
//       type: CREATE_USER_ERROR,
//       data: { error: "User already exists" },
//     });
//   }
// }

// function* deleteUser(action) {
//   const res = yield call(fetch, "/api/user", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ user: action.data }),
//   });

//   if (res.status === 200) {
//     yield put({ type: DELETE_USER_LOADED, data: action.data });
//   } else {
//     yield put({
//       type: DELETE_USER_ERROR,
//       data: { error: "Cannot delete user" },
//     });
//   }
// }

// function* updateUser(action) {
//   try {
//     yield call(fetch, "/api/user", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(action.data),
//     });
//     yield put({ type: UPDATE_USER_LOADED, data: action.data });
//   } catch (error) {
//     yield put({ type: UPDATE_USER_ERROR, data: "Error" });
//   }
// }

export function* rootSaga() {
  yield takeLatest(GET_LIKED_PRODUCTS, getLikedProducts);
  yield takeLatest(UPDATE_LIKED_PRODUCTS, updateLikedProducts);
  yield takeLatest(DELETE_LIKED_PRODUCT, deleteLikedProduct);

  // yield takeLatest(GET_USER, getUser);
  // yield takeLatest(CREATE_USER, createUser);
  // yield takeLatest(DELETE_USER, deleteUser);

  // yield takeLatest(UPDATE_USER, updateUser);

  // yield takeLatest(UPDATE_NAME_LOADED, updateName);
  // yield takeLatest(DELETE_NAME, deleteName);
}

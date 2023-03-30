import { combineReducers } from "@reduxjs/toolkit";

import { productCart } from "./productCart";
import { searchTerm } from "./searchTerm";
import { recentlyViewed } from "./recentlyViewed";
import { modal } from "./modal";
import { likedProducts } from "./likedProducts";
import { allProducts } from "./allProducts";

const combinedReducers = {
  productCart,
  recentlyViewed,
  modal,
  searchTerm,
  likedProducts,
  allProducts,
};

export default combineReducers(combinedReducers);

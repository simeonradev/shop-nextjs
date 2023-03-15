import { combineReducers } from "@reduxjs/toolkit";

import { productCart } from "./productCart";
import { productData } from "./productData";
import { selectedCategory } from "./selectedCategory";
import { searchTerm } from "./searchTerm";
import { recentlyViewed } from "./recentlyViewed";
import { modal } from "./modal";
import { likedProducts } from "./likedProducts";
import { allProducts } from "./allProducts";

const combinedReducers = {
  productData,
  productCart,
  recentlyViewed,
  modal,
  searchTerm,
  selectedCategory,
  likedProducts,
  allProducts,
};

export default combineReducers(combinedReducers);

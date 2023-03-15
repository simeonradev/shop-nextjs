import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { GET_PRODUCT_DATA_ARRAY } from "../core/actions";

import ProductList from "../components/ProductList";
import productDataArray from "../components/productDataArray";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "300px",
  overflowX: "scroll",
};
const HomePage = () => {
  const dispatch = useDispatch();
  const productDataArrayFromReducer = useSelector((state) => {
    return state.productData;
  });

  const recentlyViewedArray = useSelector((state) => {
    return state.recentlyViewed;
  });

  const recentlyViewedProducts = recentlyViewedArray.map((productId) =>
    productDataArrayFromReducer.find((product) => product.id === productId)
  );

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_DATA_ARRAY,
      data: productDataArray,
    });
  }, []);

  return (
    <Box sx={{ pt: "80px" }}>
      <ProductList
        products={productDataArray.filter(
          (productData) => productData.featured === true
        )}
      />
      {recentlyViewedProducts.length === 0 ? null : (
        <Box>
          Recently Viewed Products
          <ProductList
            style={style}
            products={recentlyViewedProducts}
          ></ProductList>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

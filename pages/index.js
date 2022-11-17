import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import { SELECTED_CATEGORY, GET_PRODUCT_DATA_ARRAY } from "../core/actions";

import ProductList from "../components/ProductList";
import productDataArray from "../components/productDataArray";
import { useRouter } from "next/router";

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
  const router = useRouter();

  ///////////////////////// Use backend data ///////////////////////////////
  // useEffect(() => {
  //   async function getResponse() {
  //     try {
  //       const response = await fetch("http://localhost:3001/products", {
  //         method: "GET",
  //       });

  //       const actualData = await response.json();

  //       dispatch({
  //         type: GET_PRODUCT_DATA_ARRAY,
  //         data: actualData,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getResponse();
  // }, []);

  // const globalModal = useSelector((state) => {
  //   return state.modal.modal;
  // });

  // useEffect(() => {
  //   dispatch({
  //     type: GET_PRODUCT_DATA_ARRAY,
  //     data: productDataArray,
  //   });
  // }, [dispatch]);

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
  }, [dispatch]);
  return (
    <Box sx={{ pt: "60px" }}>
      <br />
      <Box>
        Categories:
        <Button
          onClick={() => {
            dispatch({ type: SELECTED_CATEGORY, data: "car" });
            router.push("/filteredByCategory");
          }}
        >
          Car
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
            router.push("/filteredByCategory");
          }}
        >
          Clothes
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
            router.push("/filteredByCategory");
          }}
        >
          Electronics
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: SELECTED_CATEGORY, data: "food" });
            router.push("/filteredByCategory");
          }}
        >
          Food
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: SELECTED_CATEGORY, data: "garden" });
            router.push("/filteredByCategory");
          }}
        >
          Garden
        </Button>
      </Box>
      <br />
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

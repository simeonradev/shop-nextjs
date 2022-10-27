import { Box, Button, Link } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { SELECTED_CATEGORY } from "../core/actions";
import ProductList from "../components/ProductList";

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
  //   return state.modalReducer.modal;
  // });

  // useEffect(() => {
  //   dispatch({
  //     type: GET_PRODUCT_DATA_ARRAY,
  //     data: productDataArray,
  //   });
  // }, [dispatch]);

  const productDataArray = useSelector((state) => {
    return state.productDataReducer.productDataArray;
  });

  const recentlyViewedArray = useSelector((state) => {
    return state.recentlyViewedReducer.recentlyViewedArray;
  });

  const recentlyViewedProducts = recentlyViewedArray.map((productId) =>
    productDataArray.find((product) => product.id === productId)
  );

  return (
    <Box sx={{ pt: "30px" }}>
      <br />
      <Box>
        Categories:
        <Link href="/filteredByCategoryPage">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "car" });
            }}
          >
            Car
          </Button>
        </Link>
        <Link href="/filteredByCategoryPage">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
            }}
          >
            Clothes
          </Button>
        </Link>
        <Link href="/filteredByCategoryPage">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
            }}
          >
            Electronics
          </Button>
        </Link>
        <Link href="/filteredByCategoryPage">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "food" });
            }}
          >
            Food
          </Button>
        </Link>
        <Link href="/filteredByCategoryPage">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "garden" });
            }}
          >
            Garden
          </Button>
        </Link>
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

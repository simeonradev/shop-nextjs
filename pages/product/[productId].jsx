import { Box, Button, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";

import {
  ADD_PRODUCT_TO_CART,
  DELETE_LIKED_PRODUCT,
  UPDATE_LIKED_PRODUCTS,
  GET_PRODUCT_DATA_ARRAY,
} from "../../core/actions";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ProductList from "../../components/ProductList";
import { useEffect } from "react";
import productDataArray from "../../components/productDataArray";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "310px",
  overflowX: "scroll",
};

const ProductPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const { productId } = router.query;

  // const productDataArray = useSelector((state) => {
  //   return state.productData;
  // });

  const likedProducts = useSelector((state) => {
    return state.likedProducts;
  });

  const selectedProduct = productDataArray.find((product) => {
    return product.id === productId;
  });

  const handleAddToCart = () => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: selectedProduct,
    });
  };

  const test = (a) => {
    return productDataArray.filter(
      (productData) =>
        productData.rating === selectedProduct.rating - a ||
        productData.rating === selectedProduct.rating + a
    );
  };

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_DATA_ARRAY,
      data: productDataArray,
    });
  }, [dispatch]);

  if (productDataArray.length === 0)
    return <Box sx={{ pt: "60px", textAlign: "center" }}>Loading</Box>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" sx={{ pt: "60px", textAlign: "center" }}>
        {selectedProduct.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={selectedProduct.img}
          sx={{
            maxHeight: "300px",
            borderRadius: "15px",
            boxShadow: "0 0 10px #000000",
          }}
        ></Box>
        <Box sx={{ minWidth: "120px" }}>
          <Typography>Price: {selectedProduct.price}</Typography>
          <Typography>Category: {selectedProduct.category}</Typography>
          <Typography>Location: {selectedProduct.location}</Typography>
          <Typography>Rating: {selectedProduct.rating}</Typography>
          <Typography>
            InStock: {JSON.stringify(selectedProduct.inStock)}
          </Typography>
          <Button onClick={() => handleAddToCart()} color="secondary">
            Add to Cart
          </Button>
          <br></br>

          {likedProducts.find(
            (productId) => productId === selectedProduct.id
          ) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: DELETE_LIKED_PRODUCT,
                  data: { id: selectedProduct.id, userId: session.user.id },
                });
              }}
              color={"secondary"}
            >
              Liked
              <FavoriteIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: UPDATE_LIKED_PRODUCTS,
                  data: { id: selectedProduct.id, userId: session.user.id },
                });
              }}
              color={"secondary"}
            >
              Like
              <FavoriteBorderIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        Similar Products
        <ProductList style={style} products={test(1)}></ProductList>
      </Box>
    </Box>
  );
};
export default ProductPage;

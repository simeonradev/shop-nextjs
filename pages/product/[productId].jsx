import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  ADD_PRODUCT_TO_CART,
  DELETE_LIKED_PRODUCT,
  UPDATE_LIKED_PRODUCTS,
  GET_PRODUCTS,
} from "../../core/actions";

import ProductList from "../../components/ProductList";

const similarProductsStyle = {
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

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  const likedProducts = useSelector((state) => {
    return state.likedProducts;
  });

  const selectedProduct = allProducts.find((product) => {
    return product.id === productId;
  });

  const handleAddToCart = () => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: selectedProduct,
    });
  };

  const similarProducts = (a) => {
    return allProducts.filter(
      (productData) =>
        productData.rating === selectedProduct.rating - a ||
        productData.rating === selectedProduct.rating + a
    );
  };

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
    });
  }, []);

  if (allProducts.length === 0)
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
        <ProductList
          style={similarProductsStyle}
          products={similarProducts(1)}
        ></ProductList>
      </Box>
    </Box>
  );
};
export default ProductPage;

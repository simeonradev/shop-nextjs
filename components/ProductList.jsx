import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton } from "@mui/material";

import ProductCard from "../components/ProductCard";
import { useModal } from "./useModal";
import { ProductPreviewModal } from "../modals/ProductPreviewModal";
import {
  ADD_PRODUCT_TO_CART,
  RECENTLY_VIEWED,
  DELETE_LIKED_PRODUCT,
  UPDATE_LIKED_PRODUCTS,
  GET_LIKED_PRODUCTS,
} from "../core/actions";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { LikeButtonModal } from "../modals/LikeButtonModal";

const ProductList = ({ products, ...rest }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const handleAddToCart = (product) => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: product,
    });
  };

  const { showModal, hideModal } = useModal();

  const likedProducts = useSelector((state) => {
    return state.likedProducts;
  });

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({
        type: GET_LIKED_PRODUCTS,
        data: { userId: session?.user.id },
      });
    }
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      {...rest}
    >
      {products.map((prodDataBySearch) => {
        return (
          <ProductCard
            withoutModal
            onClick={() => {
              dispatch({
                type: RECENTLY_VIEWED,
                data: prodDataBySearch.id,
              });
            }}
            key={prodDataBySearch.id}
            {...prodDataBySearch}
            footerActions={
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => handleAddToCart(prodDataBySearch)}
                  color={"secondary"}
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={() =>
                    showModal(
                      <ProductPreviewModal
                        {...prodDataBySearch}
                        hideModal={hideModal}
                      />
                    )
                  }
                  color="secondary"
                >
                  Preview
                </Button>

                {likedProducts.find(
                  (productId) => productId === prodDataBySearch.id
                ) ? (
                  <IconButton
                    onClick={() => {
                      if (status === "authenticated") {
                        dispatch({
                          type: DELETE_LIKED_PRODUCT,
                          data: {
                            id: prodDataBySearch.id,
                            userId: session.user.id,
                          },
                        });
                      } else {
                        console.log("not logged in");
                      }
                    }}
                    color={"secondary"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      if (status === "authenticated") {
                        dispatch({
                          type: UPDATE_LIKED_PRODUCTS,
                          data: {
                            id: prodDataBySearch.id,
                            userId: session.user.id,
                          },
                        });
                      } else {
                        showModal(<LikeButtonModal hideModal={hideModal} />);
                      }
                    }}
                    color={"secondary"}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </Box>
            }
          ></ProductCard>
        );
      })}
    </Box>
  );
};

export default ProductList;

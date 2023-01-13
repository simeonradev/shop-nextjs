import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton } from "@mui/material";

import ProductCard from "../components/ProductCard";
import { useModal } from "../components/useModal";
import { ProductPreviewModal } from "../modals/ProductPreviewModal";
import {
  ADD_PRODUCT_TO_CART,
  RECENTLY_VIEWED,
  ADD_TO_LIKED,
  REMOVE_FROM_LIKED,
} from "../core/actions";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductList = ({ products, ...rest }) => {
  const dispatch = useDispatch();
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

  const addProductToLiked = async (event, prodDataBySearchId) => {
    event.preventDefault();
    const res = await fetch("/api/likedProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prodDataBySearchId }),
    });
    if (res.ok) {
      const likedProductsIds = await res.json();
      console.log("Liked Products Ids:", likedProductsIds);
    }
  };

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
                      dispatch({
                        type: REMOVE_FROM_LIKED,
                        data: prodDataBySearch.id,
                      });
                    }}
                    color={"secondary"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: ADD_TO_LIKED,
                        data: prodDataBySearch.id,
                      });
                    }}
                    color={"secondary"}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
                <Button
                  onClick={(event) =>
                    addProductToLiked(event, prodDataBySearch.id)
                  }
                >
                  Test
                </Button>
              </Box>
            }
          ></ProductCard>
        );
      })}
    </Box>
  );
};

export default ProductList;

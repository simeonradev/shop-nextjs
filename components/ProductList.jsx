import { Box, Button, IconButton } from "@mui/material";

import ProductCard from "../components/ProductCard";
import { useModal } from "./useModal";
import { ProductPreviewModal } from "../modals/ProductPreviewModal";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSession } from "next-auth/react";
import { LikeButtonModal } from "../modals/LikeButtonModal";
import {
  useGetLikedProducts,
  useUpdateLikedProduct,
  useDeleteLikedProduct,
} from "../core/react-query/features/liked-products";

import { useUpdateRecentlyViewed } from "../core/react-query/features/recently-viewed-products";
import { useUpdateShoppingCart } from "../core/react-query/features/shopping-cart";

const ProductList = ({ products, ...rest }) => {
  const { data: session, status } = useSession();

  const { data: likedProducts } = useGetLikedProducts({
    userId: session?.user.id,
  });
  const updateLikedProduct = useUpdateLikedProduct();
  const deleteLikedProduct = useDeleteLikedProduct();

  const updateRecentlyViewed = useUpdateRecentlyViewed();

  const updateShoppingCart = useUpdateShoppingCart();

  const handleAddToCart = (product) => {
    if (status === "authenticated") {
      updateShoppingCart.mutate({
        ...product,
        userId: session.user.id,
      });
    } else {
      console.log("not logged in");
    }
  };

  const { showModal, hideModal } = useModal();

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      {...rest}
    >
      {products?.map((prodDataBySearch) => {
        return (
          <ProductCard
            withoutModal
            onClick={() => {
              if (status === "authenticated") {
                updateRecentlyViewed.mutate({
                  id: prodDataBySearch.id,
                  userId: session.user.id,
                });
              } else {
                console.log("not logged in");
              }
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
                        deleteLikedProduct.mutate({
                          id: prodDataBySearch.id,
                          userId: session.user.id,
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
                        updateLikedProduct.mutate({
                          id: prodDataBySearch.id,
                          userId: session.user.id,
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

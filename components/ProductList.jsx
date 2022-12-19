import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";

import ProductCard from "../components/ProductCard";
// import ProductPreviewModal from "./ProductPreviewModal";
import { useModal } from "../components/useModal";
import { ProductPreviewModal } from "../modals/ProductPreviewModal";
import {
  ADD_PRODUCT_TO_CART,
  RECENTLY_VIEWED,
  OPEN_MODAL,
  CLOSE_MODAL,
  MODAL,
} from "../core/actions";

const ProductList = ({ products, ...rest }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: product,
    });
  };

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const { showModal, hideModal } = useModal();

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
                <Button onClick={() => handleAddToCart(prodDataBySearch)}>
                  Add to Cart
                </Button>

                {/* <Button
                  onClick={() => {
                    dispatch({
                      type: OPEN_MODAL,
                      data: prodDataBySearch,
                    });
                    dispatch({
                      type: MODAL,
                      data: (
                        <ProductPreviewModal
                          handleCloseModal={handleCloseModal}
                          key={prodDataBySearch.id}
                          {...prodDataBySearch}
                        ></ProductPreviewModal>
                      ),
                    });
                  }}
                >
                  Preview Redux
                </Button> */}

                <Button
                  onClick={() =>
                    showModal(
                      <ProductPreviewModal
                        {...prodDataBySearch}
                        hideModal={hideModal}
                      />
                    )
                  }
                >
                  Preview
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

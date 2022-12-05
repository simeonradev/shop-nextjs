import { useDispatch } from "react-redux";

import ProductCard from "../components/ProductCard";
import ProductPreviewModal from "./ProductPreviewModal";

import { Box, Button } from "@mui/material";

import {
  ADD_PRODUCT_TO_CART,
  RECENTLY_VIEWED,
  OPEN_MODAL,
  CLOSE_MODAL,
  MODAL,
} from "../core/actions";
// import { useRouter } from "next/router";
import ModalTest from "./Modal";

const ProductList = ({ products, ...rest }) => {
  const dispatch = useDispatch();
  // const router = useRouter();

  const { showModal, hideModal } = useGlobalModal();

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

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      {...rest}
    >
      {products.map((productDataFilteredBySearch) => {
        return (
          <ProductCard
            withoutModal
            onClick={() => {
              dispatch({
                type: RECENTLY_VIEWED,
                data: productDataFilteredBySearch.id,
              });
              // router.push(`/product/${productDataFilteredBySearch.id}`);
            }}
            key={productDataFilteredBySearch.id}
            {...productDataFilteredBySearch}
            footerActions={
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => handleAddToCart(productDataFilteredBySearch)}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    dispatch({
                      type: OPEN_MODAL,
                      data: productDataFilteredBySearch,
                    });
                    dispatch({
                      type: MODAL,
                      data: (
                        <ProductPreviewModal
                          handleCloseModal={handleCloseModal}
                          key={productDataFilteredBySearch.id}
                          {...productDataFilteredBySearch}
                        ></ProductPreviewModal>
                      ),
                    });
                  }}
                >
                  Old
                </Button>
                <ModalTest
                  key={productDataFilteredBySearch.id}
                  {...productDataFilteredBySearch}
                ></ModalTest>
                <Button
                  onClick={() =>
                    showModal(
                      <Box>
                        content
                        <Button onClick={() => hideModal()}> Close</Button>
                      </Box>
                    )
                  }
                >
                  Open Modal
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

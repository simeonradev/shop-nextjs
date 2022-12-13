import { useContext } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import ProductCard from "../components/ProductCard";
import ProductPreviewModal from "./ProductPreviewModal";
import { ModalContext } from "../pages/_app";

import {
  ADD_PRODUCT_TO_CART,
  RECENTLY_VIEWED,
  OPEN_MODAL,
  CLOSE_MODAL,
  MODAL,
} from "../core/actions";

const ImgBox = styled(Box)`
  border: 1px solid #00000080;
  border-radius: 50px;
  padding: 3px;
  width: 75px;
  box-shadow: 0 0 10px #000000;
`;

export const ModalContent = (props) => (
  <Box>
    <Box sx={{ textAlign: "center" }}>
      {props.img === undefined ? (
        <ImgBox component="img" alt={props.id} src="/images/didi.jpg" />
      ) : (
        <ImgBox component="img" alt={props.id} src={props.img} />
      )}
    </Box>
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      {props.name}
    </Typography>
    <Typography>Price: {props.price}</Typography>
    <Typography>Category: {props.category}</Typography>
    <Typography>Location: {props.location}</Typography>
    <Typography>Rating: {props.rating}</Typography>
    <Typography>InStock: {JSON.stringify(props.inStock)}</Typography>
    <Button onClick={props.hideModal}>close</Button>
  </Box>
);

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

  const controlModal = useContext(ModalContext);

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
                <Button
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
                </Button>
                <Button
                  onClick={() =>
                    controlModal.showModal(
                      <ModalContent
                        {...prodDataBySearch}
                        hideModal={controlModal.hideModal}
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

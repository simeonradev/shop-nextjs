import React, { Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  ClickAwayListener,
} from "@mui/material";

// import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../components/ModalContext";
import ModalRoot from "../components/ModalRoot";

import { styled } from "@mui/system";

const ImgBox = styled(Box)`
  border: 1px solid #00000080;
  border-radius: 50px;
  padding: 3px;
  width: 75px;
  box-shadow: 0 0 10px #000000;
`;

const styleModal = {
  backgroundColor: "teal",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "32px",
};

const styleModal1 = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "280px",
    border: "2px solid #000",
    boxShadow:
      "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
    padding: "32px",
  },
};

const ModalTest = (props) => {
  const ModalContent = ({ onRequestClose, ...otherProps }) => (
    <Modal open={true} {...otherProps}>
      {/* <Modal
      style={styleModal1}
      isOpen
      onRequestClose={onRequestClose}
      {...otherProps}
      ariaHideApp={false}
    > */}
      {/* <ClickAwayListener onClickAway={onRequestClose}> */}
      <Box style={styleModal}>
        {/* <Box> */}
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
        <Button onClick={onRequestClose}>close</Button>
      </Box>
      {/* </ClickAwayListener> */}
    </Modal>
  );

  return (
    <ModalProvider>
      <ModalRoot />
      <ModalConsumer>
        {({ showModal }) => (
          <Fragment>
            <Button onClick={() => showModal(ModalContent)}>New</Button>
          </Fragment>
        )}
      </ModalConsumer>
    </ModalProvider>
  );
};

export default ModalTest;

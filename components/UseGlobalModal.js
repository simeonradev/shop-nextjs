import { Box, Modal } from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../pages/_app";

const styleModal = {
  backgroundColor: "white",
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

const UseGlobalModal = () => {
  const controlModal = useContext(ModalContext);

  return (
    <Box>
      <Modal open={controlModal.component ? true : false}>
        <Box style={styleModal}>{controlModal.component}</Box>
      </Modal>
    </Box>
  );
};

export default UseGlobalModal;

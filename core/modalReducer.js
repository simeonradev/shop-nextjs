import { Modal, Box } from "@mui/material";

import { MODAL, CLOSE_MODAL } from "./actions";

const initialState = { modal: null };

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
  p: 4,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL:
      return {
        modal: (
          <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>{action.data}</Box>
          </Modal>
        ),
      };
    case CLOSE_MODAL:
      return { modal: null };

    default:
      return state;
  }
};

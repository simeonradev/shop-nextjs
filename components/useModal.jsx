import { Dialog } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  showProductModal: () => {},
  hideProductModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const GlobalModal = (props) => {
  const [content, setContent] = useState(null);

  const showModal = (content) => {
    setContent(content);
  };

  const hideModal = () => {
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {props.children}
      <Dialog
        sx={{ ".MuiPaper-root": { width: 400 } }}
        onClose={hideModal}
        open={!!content}
      >
        {content}
      </Dialog>
    </ModalContext.Provider>
  );
};

import { useSelector } from "react-redux";

const GlobalModal = () => {
  const modal = useSelector((state) => {
    return state.modal;
  });

  return modal;
};

export default GlobalModal;

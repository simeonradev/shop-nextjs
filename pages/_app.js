import { useState, createContext } from "react";

import NavBar from "../components/NavBar";
// import GlobalModal from "../components/GlobalModal";
import { wrapper } from "../core/store";
import { Provider } from "react-redux";

import { GlobalModal } from "../components/useModal";

export const ProductListColor = createContext();

const MyApp = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  const [listColor, setListColor] = useState(true);
  const test = {
    listColor: listColor,
    toggleColor: () => {
      setListColor((prevColor) => !prevColor);
    },
  };

  return (
    <Provider store={store}>
      <ProductListColor.Provider value={test}>
        <GlobalModal>
          <NavBar />
          {/* <GlobalModal></GlobalModal> */}
          <Component {...pageProps} />
        </GlobalModal>
      </ProductListColor.Provider>
    </Provider>
  );
};

export default MyApp;

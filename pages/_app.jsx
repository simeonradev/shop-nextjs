import { Provider } from "react-redux";

import { wrapper } from "../core/store";

import { GlobalModal } from "../components/useModal";
import { GlobalTheme } from "../components/useMUITheme";
import NavBar from "../components/NavBar";

const MyApp = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <GlobalTheme>
        <GlobalModal>
          <NavBar />

          <Component {...pageProps} />
        </GlobalModal>
      </GlobalTheme>
    </Provider>
  );
};

export default MyApp;

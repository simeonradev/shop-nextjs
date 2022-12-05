import NavBar from "../components/NavBar";
import GlobalModal from "../components/GlobalModal";
import { wrapper } from "../core/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <NavBar />
      <GlobalModal />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

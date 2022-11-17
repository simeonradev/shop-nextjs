import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../core/store";

import NavBar from "../components/NavBar";
import GlobalModal from "../components/GlobalModal";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <NavBar />
      <GlobalModal />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

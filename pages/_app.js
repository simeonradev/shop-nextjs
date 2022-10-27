import "../styles/globals.css";
import { store } from "../core/store";
import { Provider } from "react-redux";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

import { useState, createContext } from "react";

import NavBar from "../components/NavBar";
import GlobalModal from "../components/GlobalModal";
import { wrapper } from "../core/store";
import { Provider } from "react-redux";
import UseGlobalModal from "../components/UseGlobalModal";

import NewContextComponent from "../components/NewContextComponent";

export const ThemeContext = createContext();

export const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

const MyApp = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  const [darkTheme, setDarkTheme] = useState(true);

  const valueObject = {
    darkTheme: darkTheme,
    toggleTheme: () => {
      setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    },
  };
  /////////////////////////////////////////////////////////////////

  const showModal = (component, props) => {
    setState({
      component,
      props,
      showModal: showModal,
      hideModal: hideModal,
    });
  };

  const hideModal = () => {
    setState({
      component: null,
      props: {},
      showModal: showModal,
      hideModal: hideModal,
    });
  };

  const [state, setState] = useState({
    component: null,
    props: {},
    showModal: showModal,
    hideModal: hideModal,
  });
  return (
    <Provider store={store}>
      <ModalContext.Provider value={state}>
        <UseGlobalModal />
        <ThemeContext.Provider value={valueObject}>
          <NewContextComponent />
          <button onClick={valueObject.toggleTheme}>Toggle Theme</button>
          <NavBar />
          <GlobalModal></GlobalModal>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </ModalContext.Provider>
    </Provider>
  );
};

export default MyApp;

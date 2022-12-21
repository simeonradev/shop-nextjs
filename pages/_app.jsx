import { useState, createContext } from "react";
import { Provider } from "react-redux";

import NavBar from "../components/NavBar";
import { wrapper } from "../core/store";

import { GlobalModal } from "../components/useModal";
// import GlobalModal from "../components/GlobalModal";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "../theme.dark";
import { lightTheme } from "../theme.light";

export const ColorModeContext = createContext();

const MyApp = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  const [mode, setMode] = useState("light");

  const theme = createTheme(mode === "light" ? lightTheme : darkTheme);

  const colorMode = {
    mode: mode,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  console.log(mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Provider store={store}>
          <GlobalModal>
            <NavBar />

            {/* <GlobalModal></GlobalModal> */}
            <Component {...pageProps} />
          </GlobalModal>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MyApp;

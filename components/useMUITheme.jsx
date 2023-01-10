import { useState, createContext, useContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme } from "../theme.dark";
import { lightTheme } from "../theme.light";

const ColorModeContext = createContext();

export const useMUITheme = () => useContext(ColorModeContext);

export const GlobalTheme = (props) => {
  const [mode, setMode] = useState("light");

  const theme = createTheme(mode === "light" ? lightTheme : darkTheme);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const ProdCardColor = mode;

  console.log();
  return (
    <ColorModeContext.Provider
      value={{ toggleColorMode, theme, ProdCardColor }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

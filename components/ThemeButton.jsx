import { useContext } from "react";

import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../pages/_app";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeButton = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.theme === "light" ? (
        <Brightness4Icon style={{ color: "black" }} />
      ) : (
        <Brightness7Icon style={{ color: "white" }} />
      )}
    </IconButton>
  );
};

export default ThemeButton;

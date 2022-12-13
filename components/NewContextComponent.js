import { Modal } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

const NewContextComponent = () => {
  const themeStyles = (dark) => {
    return {
      backgroundColor: dark ? "#333" : "#CCC",
      color: dark ? "#CCC" : "#333",
      padding: "2rem",
      margin: "2rem",
    };
  };

  const valueObject = useContext(ThemeContext);

  return (
    <Modal open={false}>
      <div style={themeStyles(valueObject.darkTheme)}>
        Class Theme
        <button onClick={valueObject.toggleTheme}>Toggle Theme</button>
      </div>
    </Modal>
  );
};

export default NewContextComponent;

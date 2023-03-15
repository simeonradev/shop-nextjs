import {
  Box,
  Button,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useState } from "react";

const Test = () => {
  const [openSportCategory, setOpenSportCategory] = useState(false);
  const [openVacationCategory, setOpenVacationCategory] = useState(false);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleClickSport = () => {
    setOpenSportCategory(!openSportCategory);
    setOpenVacationCategory(false);

    if (openSportCategory === false) {
      setCategory("sport");
      setSubCategory("");
    } else {
      setCategory("");
      setSubCategory("");
    }
  };

  const handleClickVacation = () => {
    setOpenVacationCategory(!openVacationCategory);
    setOpenSportCategory(false);
    if (openVacationCategory === false) {
      setCategory("vacation");
      setSubCategory("");
    } else {
      setCategory("");
      setSubCategory("");
    }
  };

  console.log("category:", category, "subCategory:", subCategory);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 200,
        bgcolor: "background.paper",
        pt: "70px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Box>
        <Button onClick={handleClickSport}>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Sport" />
          {openSportCategory ? <ExpandLess /> : <ExpandMore />}
        </Button>

        <Collapse in={openSportCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("football")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Football" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("tenis")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Tenis" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("volleyball")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Volleyball" />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>
      <Box>
        <Button onClick={handleClickVacation}>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Vacation" />
          {openVacationCategory ? <ExpandLess /> : <ExpandMore />}
        </Button>

        <Collapse in={openVacationCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("sea")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Sea" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("mountain")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Mountain" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubCategory("valley")}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Valley" />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>
    </List>
  );
};
export default Test;

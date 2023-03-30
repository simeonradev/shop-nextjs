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

  const test = [
    {
      label: "Sport",
      open: openSportCategory,
      onClick: () => {
        handleClickSport;
      },
      subCategories: [
        { label: "Football", onClick: () => setSubCategory("football") },
        { label: "Tenis", onClick: () => setSubCategory("tenis") },
        {
          label: "Volleyball",
          onClick: () => setSubCategory("volleyball"),
        },
      ],
    },
    {
      label: "Vacation",
      open: openVacationCategory,
      onClick: handleClickVacation,
      subCategories: [
        { label: "Sea", onClick: () => setSubCategory("sea") },
        { label: "Mountain", onClick: () => setSubCategory("mountain") },
        { label: "Valley", onClick: () => setSubCategory("valley") },
      ],
    },
  ];

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
      {test.map((category, index) => (
        <Box key={index}>
          <Button onClick={category.onClick}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={category.label} />
            {category.open ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={category.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.subCategories.map((subCategory, subIndex) => (
                <ListItemButton
                  key={subIndex}
                  sx={{ pl: 4 }}
                  onClick={subCategory.onClick}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={subCategory.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
};
export default Test;

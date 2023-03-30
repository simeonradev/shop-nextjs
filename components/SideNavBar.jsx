import { useEffect, useState } from "react";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { styled } from "@mui/system";

import {
  Chip,
  Box,
  Slider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Drawer,
  FormControlLabel,
  Tooltip,
} from "@mui/material";

import { useRouter } from "next/router";

const SideNavBarBox = styled(Box)`
  background-color: #cf6f00;
  border: 2px solid #00000080;
  box-shadow: 0 0 1px #000000;
  overflow-x: hidden;
  padding-top: 20px;
  position: fixed;
  top: 53px;
  width: 180px;
  text-align: center;
  height: 100%;
`;

const sort = (data) => {
  const array = data;
  for (let index = 0; index < array.length; index++) {
    if (array[index] > array[index + 1]) {
      let temp = array[index];
      array[index] = array[index + 1];
      array[index + 1] = temp;
      index = -1;
    }
  }
  return array;
};

const SideNavBar = ({ data, onFilter }) => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedInStock, setSelectedInStock] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [valueArray, setValueArray] = useState([minPrice, maxPrice]);

  const filterProducts = ({ location, price, stock, rating, category }) => {
    return data.filter((productData) => {
      let location1;
      if (location) {
        location1 =
          productData.location.includes(selectedLocation) ||
          selectedLocation === "All";
      }

      let category1;
      if (category) {
        category1 =
          productData.category.includes(selectedCategory) ||
          selectedCategory === "All";
      }

      let stock1;
      if (stock) {
        stock1 =
          productData.inStock === selectedInStock || selectedInStock === "";
      }

      let rating1;
      if (rating) {
        rating1 =
          productData.rating === selectedRating || selectedRating === "";
      }

      let price1;
      if (price) {
        price1 =
          productData.price >= valueArray[0] &&
          productData.price <= valueArray[1];
      }

      return ![location1, stock1, rating1, price1, category1].includes(false);
    });
  };

  const availableRatings = [
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
    { rating: 5 },
  ];

  function valuetext(value) {
    return { value };
  }

  const handlePriceChange = (event, newValue) => {
    if (newValue[1] > maxPrice) {
      setValueArray([newValue[0], maxPrice]);
    } else if (newValue[0] < minPrice) {
      setValueArray([minPrice, newValue[1]]);
    } else {
      setValueArray(newValue);
      router.query = {
        ...router.query,
        minPrice: newValue[0],
        maxPrice: newValue[1],
      };
      router.push(router, undefined, { shallow: true });
    }
  };
  //////////////////////////////////// Handle Change ////////////////////////////////

  const handleLocationChange = (event) => {
    const inputLocation = String(event);
    if (inputLocation === selectedLocation) {
      setSelectedLocation("All");

      router.query = { ...router.query, location: "All" };
      router.push(router, undefined, { shallow: true });
    } else {
      setSelectedLocation(inputLocation);

      router.query = { ...router.query, location: inputLocation };
      router.push(router, undefined, { shallow: true });
    }
  };

  const handleCategoryChange = (event) => {
    const inputCategory = String(event);
    if (inputCategory === selectedCategory) {
      setSelectedCategory("All");

      router.query = { ...router.query, category: "All" };
      router.push(router, undefined, { shallow: true });
    } else {
      setSelectedCategory(inputCategory);

      router.query = { ...router.query, category: inputCategory };
      router.push(router, undefined, { shallow: true });
    }
  };

  const handleStockChange = (event) => {
    const inputInStock = Boolean(event.target.value);
    if (inputInStock === selectedInStock) {
      setSelectedInStock("");

      router.query = { ...router.query, inStock: "" };
      router.push(router, undefined, { shallow: true });
    } else {
      setSelectedInStock(inputInStock);

      router.query = { ...router.query, inStock: inputInStock };
      router.push(router, undefined, { shallow: true });
    }
  };

  const handleRatingChange = (event) => {
    const inputRating = Number(event.target.id);

    if (inputRating === selectedRating) {
      setSelectedRating("");

      router.query = { ...router.query, rating: "" };
      router.push(router, undefined, { shallow: true });
    } else {
      setSelectedRating(inputRating);

      router.query = { ...router.query, rating: inputRating };
      router.push(router, undefined, { shallow: true });
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// Handle Delete ////////////////////////////////
  const handleDeletePrice = () => {
    setValueArray([minPrice, maxPrice]);

    router.query = {
      ...router.query,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteLocation = () => {
    setSelectedLocation("All");

    router.query = { ...router.query, location: "All" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteCategory = () => {
    setSelectedCategory("All");

    router.query = { ...router.query, category: "All" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteStock = () => {
    setSelectedInStock("");

    router.query = { ...router.query, inStock: "" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteRating = () => {
    setSelectedRating("");

    router.query = { ...router.query, rating: "" };
    router.push(router, undefined, { shallow: true });
  };
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////// Chips //////////////////////////////
  const rangeChip = {
    onDelete: handleDeletePrice,
    label: "Clear Price",
    icon: <SellOutlinedIcon />,
  };
  const locationChip = {
    onDelete: handleDeleteLocation,
    label: "Clear Location",
    icon: <LocationOnOutlinedIcon />,
  };
  const stockChip = {
    onDelete: handleDeleteStock,
    label: "Clear Stock",
    icon: <InventoryOutlinedIcon />,
  };
  const ratingChip = {
    onDelete: handleDeleteRating,
    label: "Clear Rating",
    icon: <GradeOutlinedIcon />,
  };
  const categoryChip = {
    onDelete: handleDeleteCategory,
    label: "Clear Category",
    icon: <CategoryOutlinedIcon />,
  };

  const chipArray = [];
  (minPrice !== valueArray[0] || maxPrice !== valueArray[1]) &&
    chipArray.push(rangeChip);

  selectedLocation !== "All" && chipArray.push(locationChip);
  selectedCategory !== "All" && chipArray.push(categoryChip);

  selectedInStock !== "" && chipArray.push(stockChip);
  selectedRating !== "" && chipArray.push(ratingChip);

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const newArray = filterProducts({
      location: true,
      stock: true,
      rating: true,
      category: true,
    }).map((test) => {
      return test.price;
    });

    const min = sort(newArray)[0];
    const max = sort(newArray)[newArray.length - 1];

    if (min !== undefined && max !== undefined) {
      setMinPrice(min);
      setMaxPrice(max);
      setValueArray([min, max]);
    }

    router.query = {
      ...router.query,
      minPrice: min,
      maxPrice: max,
    };
    router.push(router, undefined, { shallow: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedCategory,
    selectedInStock,
    selectedRating,
    data,
  ]);

  useEffect(() => {
    const filteredProducts = filterProducts({
      location: true,
      stock: true,
      rating: true,
      price: true,
      category: true,
    });
    onFilter(filteredProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedCategory,
    selectedInStock,
    selectedRating,
    valueArray,
    data,
  ]);

  useEffect(() => {
    const { minPrice, maxPrice } = router.query;

    setSelectedLocation(
      router.query?.location ? String(router.query?.location) : "All"
    );
    setSelectedCategory(
      router.query?.category ? String(router.query?.category) : "All"
    );
    setSelectedInStock(Boolean(router.query?.inStock) || "");
    setSelectedRating(Number(router.query?.rating) || "");

    if (minPrice && maxPrice) {
      setValueArray([
        Number(router.query?.minPrice),
        Number(router.query?.maxPrice),
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: 180,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            border: "none",
            width: 180,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Box>
            <SideNavBarBox>
              {chipArray.map((chip, i) => (
                <Tooltip key={i} title={chip.label}>
                  <Chip
                    color="warning"
                    onDelete={chip.onDelete}
                    icon={chip.icon}
                  />
                </Tooltip>
              ))}

              <Box sx={{ width: 150, margin: "20px auto 20px auto" }}>
                <Slider
                  min={minPrice}
                  max={maxPrice}
                  getAriaLabel={() => "Price range"}
                  value={valueArray}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>{valueArray[0]}</Box>
                  <Box>{valueArray[1]}</Box>
                </Box>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={
                      selectedCategory === "All" ? "All" : selectedCategory
                    }
                    label="Category"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      handleCategoryChange(e.target.value);
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="clothes">Clothes</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="garden">Garden</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={
                      selectedLocation === "All" ? "All" : selectedLocation
                    }
                    label="Location"
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      handleLocationChange(e.target.value);
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Plovdiv">Plovdiv</MenuItem>
                    <MenuItem value="Sofia">Sofia</MenuItem>
                    <MenuItem value="Stara Zagora">Stara Zagora</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <h3> Availability:</h3>
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    type="checkbox"
                    value={true}
                    onChange={handleStockChange}
                    checked={selectedInStock === true}
                  />
                }
                label="In Stock:"
                labelPlacement="start"
              />

              <h3> Sort by Rating:</h3>
              {availableRatings.map((object, i) => {
                return (
                  <Box key={i}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          type="checkbox"
                          onChange={handleRatingChange}
                          checked={selectedRating === object.rating}
                          id={object.rating.toString()}
                        />
                      }
                      label={`Rating: ${object.rating}`}
                      labelPlacement="start"
                    />
                  </Box>
                );
              })}
            </SideNavBarBox>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideNavBar;

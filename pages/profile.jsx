import { Box, Typography, Button, TextField, Paper, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DELETE_USER } from "../core/actions";
import { useEffect, useState } from "react";

import { UPDATE_USER } from "../core/actions";

const MyProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => {
    return state.user;
  });

  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [describtion, setDescribtion] = useState(currentUser.describtion);

  const changeUserDetails = () => {
    dispatch({
      type: UPDATE_USER,
      data: {
        username: currentUser.username,
        name: name,
        age: age,
        describtion: describtion,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: DELETE_USER,
      data: currentUser,
    });
  };

  useEffect(() => {
    if (!currentUser._id) {
      router.push("/login");
    }
  }, [currentUser]);

  return (
    <Grid sx={{ display: "flex", pt: "100px", pl: "20px" }}>
      {currentUser._id ? (
        <Paper
          elevation={10}
          sx={{
            padding: 3,
            width: 350,
            margin: "20px auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box align="center">
              <Typography variant="h5">Profile Page</Typography>
            </Box>
            <TextField
              sx={{ margin: "5px 0" }}
              label="Username"
              defaultValue={currentUser.username}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              label="Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              sx={{ margin: "5px 0" }}
              label="Age"
              defaultValue={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <TextField
              sx={{ margin: "5px 0" }}
              label="Description"
              defaultValue={describtion}
              onChange={(e) => setDescribtion(e.target.value)}
            />

            <Button disabled={currentUser.loading} onClick={changeUserDetails}>
              Apply
            </Button>

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ margin: "10px 0" }}
              fullWidth
              disabled={currentUser.loading}
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6">
          You are not Logged In. Please Log In.
        </Typography>
      )}
    </Grid>
  );
};

export default MyProfile;

import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CREATE_USER } from "../core/actions";

const CreateAccount = () => {
  const currentUser = useSelector((state) => {
    return state.user;
  });
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState(currentUser.password);
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [describtion, setDescribtion] = useState(currentUser.describtion);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateAccount = () => {
    dispatch({
      type: CREATE_USER,
      data: {
        username: username,
        password: password,
        name: name,
        age: age,
        describtion: describtion,
      },
    });
  };

  useEffect(() => {
    if (currentUser._id) {
      router.push("/profile");
    }
  }, [currentUser]);

  return (
    <Grid sx={{ display: "flex", pt: "100px", pl: "20px" }}>
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
            label="Username"
            placeholder="Enter username"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <Typography align="center" sx={{ color: "error.main" }}>
            {currentUser.error}
          </Typography>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ margin: "10px 0" }}
            fullWidth
            disabled={currentUser.loading}
            onClick={handleCreateAccount}
          >
            Create User
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CreateAccount;

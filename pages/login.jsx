import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { GET_USER, CLEAR_ERROR } from "../core/actions";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => {
    return state.user;
  });

  const handleLogIn = () => {
    dispatch({
      type: GET_USER,
      data: { username: username, password: password },
    });
  };

  const handleCreateAccount = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
    router.push("/createAccount");
  };

  useEffect(() => {
    if (currentUser._id) {
      router.push("/profile");
    }
  }, [currentUser]);

  return (
    <Grid sx={{ display: "flex", pt: "60px" }}>
      <Paper
        elevation={10}
        sx={{
          padding: 3,
          width: 280,
          margin: "20px auto",
        }}
      >
        <Box align="center">
          <Typography variant="h4">Log In</Typography>
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
          onClick={handleLogIn}
        >
          Log in
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          disabled={currentUser.loading}
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginPage;

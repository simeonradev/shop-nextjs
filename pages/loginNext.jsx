import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateAccount = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      callbackUrl: `${window.location.origin}/profile`,
    });
    console.log(res);

    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
  };

  console.log(router.query.callbackUrl);
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
          {error}
        </Typography>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginPage;

import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleCreateAccount = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      action: "createUser",

      callbackUrl: `${window.location.origin}/profile`,
    });

    if (res?.error) {
      setError("User already exists");
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      action: "loginUser",

      callbackUrl: `${window.location.origin}/profile`,
    });
    // console.log(res);

    if (res?.error) {
      setError("Wrong username/password");
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
  };

  const checkCredentials = () => {
    let errors = 0;
    let errorMsg = "";

    if (username.length < 5) {
      errors++;
      errorMsg += "Username must be at least 5 characters long.\n";
    }
    if (password.length < 5) {
      errors++;
      errorMsg += "Password must be at least 5 characters long.\n";
    }
    if (!password.match(/[A-Z]/)) {
      errors++;
      errorMsg += "Password must contain at least one uppercase letter.\n";
    }
    if (!password.match(/[!@#$%^&*()\-+=[\]{}\\|;:'",.<>/?]/)) {
      errors++;
      errorMsg += "Password must contain at least one special symbol.\n";
    }

    if (errors >= 1) {
      setError(errorMsg);
    } else {
      setError(null);
      handleCreateAccount();
    }
  };

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
          sx={{ margin: "10px 0" }}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          onClick={checkCredentials}
        >
          Create Account
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginPage;

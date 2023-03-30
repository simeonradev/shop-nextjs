import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Checkbox,
  Avatar,
  MenuItem,
} from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "../components/ControlledTextField";

import { avatarArray } from "../components/avatarArray";

const MyProfile = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      img: session.user.img,
      describtion: session.user.describtion,
      age: session.user.age,
      name: session.user.name,
    },
  });
  const updateUserDetails = async (userDetails) => {
    console.log(userDetails);
    await signIn("credentials", {
      redirect: false,
      username: session.user.username,
      action: "updateUser",
      ...userDetails,
    });
  };

  const handleDeleteUser = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: session.user.username,
      action: "deleteUser",
    });

    if (res.status === 200) {
      signOut();
    }
  };

  return (
    <Grid sx={{ display: "flex", pt: "100px", pl: "20px" }}>
      {session ? (
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
              <Avatar
                src={session.user.img}
                style={{
                  margin: "5px",
                  width: "80px",
                  height: "80px",
                }}
              />
            </Box>

            <form onSubmit={handleSubmit(updateUserDetails)}>
              <ControlledTextField
                name="username"
                label="Username"
                control={control}
                defaultValue={session.user.username}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ margin: "5px 0" }}
              />
              <ControlledTextField
                name="name"
                label="Name"
                control={control}
                sx={{ margin: "5px 0" }}
              />

              <ControlledTextField
                name="age"
                label="Age"
                control={control}
                sx={{ margin: "5px 0" }}
              />

              <ControlledTextField
                name="describtion"
                label="Describtion"
                control={control}
                sx={{ margin: "5px 0" }}
              />

              <ControlledTextField
                name="img"
                control={control}
                select
                renderValue={(value) => value.split("/").pop().split(".")[0]}
                label="Select Avatar"
                sx={{ margin: "5px 0" }}
              >
                {avatarArray.map((photo) => {
                  return (
                    <MenuItem key={photo} value={photo}>
                      <Avatar
                        src={photo}
                        style={{
                          width: "45px",
                          height: "45px",
                        }}
                      />
                      <Typography pl={2}>
                        {photo.split("/").pop().split(".")[0]}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </ControlledTextField>

              <Box sx={{ display: "flex" }}>
                <Checkbox
                  defaultChecked={session.user.isAdmin}
                  {...register("isAdmin")}
                />
                Admin
              </Box>

              <Box>
                <Button type="submit" fullWidth>
                  Apply
                </Button>
              </Box>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ margin: "10px 0" }}
                fullWidth
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
            </form>
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

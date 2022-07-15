import React from "react";
import LoginButton from "components/molecules/LoginButton/LoginButton";
import { Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user } = useAuth0();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: (theme) => theme.spacing(6),
      }}
    >
      {user && (
        <Typography
          variant="h2"
          sx={{ marginBottom: (theme) => theme.spacing(3) }}
        >
          Hello {user.name}, welcome to Catlean!
        </Typography>
      )}
      <LoginButton sx={{ width: "200px" }} />
    </Box>
  );
}

export default Home;

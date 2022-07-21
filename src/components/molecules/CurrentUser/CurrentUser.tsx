import React from "react";
import { Box, BoxProps } from "@mui/material";
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
import { User } from "@auth0/auth0-react";

export type OrganizationProps = {
  user: User;
  sx?: BoxProps["sx"];
};

function CurrentUser({ user, sx }: OrganizationProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <UserAvatar user={user} />
      <Box sx={{ marginLeft: (theme) => theme.spacing(1) }}>{user.name}</Box>
    </Box>
  );
}

export default CurrentUser;

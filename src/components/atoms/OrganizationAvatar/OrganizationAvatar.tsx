import React from "react";
import { Avatar } from "@mui/material";
import { Organization } from "redux/api/users/users.types";
import { colors } from "theme/colors";

export type OrganizationAvatarProps = {
  organization: Organization;
};

function OrganizationAvatar({ organization }: OrganizationAvatarProps) {
  return (
    <Avatar
      alt={organization.name}
      variant="rounded"
      sx={{ background: colors.primary.main }}
    >
      {organization.name[0]}
    </Avatar>
  );
}

export default OrganizationAvatar;

import React from "react";
import { Box, BoxProps } from "@mui/material";
import { Organization } from "redux/api/users/users.types";
import OrganizationAvatar from "components/atoms/OrganizationAvatar/OrganizationAvatar";

export type OrganizationProps = {
  organization: Organization;
  sx?: BoxProps["sx"];
};

function CurrentOrganization({ organization, sx }: OrganizationProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <OrganizationAvatar organization={organization} />
      <Box sx={{ marginLeft: (theme) => theme.spacing(1), fontWeight: 700 }}>
        {organization.name}
      </Box>
    </Box>
  );
}

export default CurrentOrganization;

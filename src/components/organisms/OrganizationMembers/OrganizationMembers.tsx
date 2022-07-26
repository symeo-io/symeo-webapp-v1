import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Box,
  BoxProps,
  Divider,
  InputAdornment,
  List,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import TextField from "components/molecules/TextField/TextField";
import Button from "components/atoms/Button/Button";
import SearchIcon from "@mui/icons-material/Search";
import OrganizationMemberListItem from "components/molecules/OrganizationMemberListItem/OrganizationMemberListItem";
import { useGetOrganizationUsersQuery } from "redux/api/organizations/organizations.api";

export type OrganizationMembersProps = {
  organizationName: string;
  sx?: BoxProps["sx"];
};

function OrganizationMembers({
  organizationName,
  sx,
}: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: usersData } = useGetOrganizationUsersQuery();
  const users = useMemo(() => usersData?.users ?? [], [usersData?.users]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    []
  );

  return (
    <Box sx={sx}>
      <Typography
        variant="h2"
        sx={{ paddingBottom: (theme) => theme.spacing(1) }}
      >
        {formatMessage({ id: "organization.members.title" })}
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            sx={{ width: "240px", marginTop: 0 }}
            size="small"
            placeholder={formatMessage({
              id: "organization.members.search-placeholder",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button>
            {formatMessage({ id: "organization.members.invite-button-label" })}
          </Button>
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
          <List>
            {users
              .filter((user) => user.email.includes(searchValue))
              .map((user) => (
                <OrganizationMemberListItem
                  key={user.id}
                  user={user}
                  organizationName={organizationName}
                />
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationMembers;

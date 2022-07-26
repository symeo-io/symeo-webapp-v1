import React, { ChangeEvent, useCallback, useState } from "react";
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
import { OrganizationUser } from "redux/api/users/users.types";
import OrganizationMemberListItem from "components/molecules/OrganizationMemberListItem/OrganizationMemberListItem";

export type OrganizationMembersProps = {
  sx?: BoxProps["sx"];
};

const mockUsersValues: OrganizationUser[] = [
  {
    id: "1",
    email: "georges.biaux@catlean.fr",
    status: "ACTIVE",
  },
  {
    id: "2",
    email: "john.doe@catlean.fr",
    status: "ACTIVE",
  },
  {
    id: "3",
    email: "george.abitbol@catlean.fr",
    status: "ACTIVE",
  },
  {
    id: "4",
    email: "luke.skywalker@catlean.fr",
    status: "PENDING",
  },
  {
    id: "5",
    email: "rick.deckard@catlean.fr",
    status: "PENDING",
  },
];

function OrganizationMembers({ sx }: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

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
            {mockUsersValues
              .filter((user) => user.email.includes(searchValue))
              .map((user) => (
                <OrganizationMemberListItem user={user} />
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationMembers;

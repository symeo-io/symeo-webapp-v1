import React, { ChangeEvent, useCallback, useState } from "react";
import { Box, Divider, InputAdornment, List, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import TextField from "components/molecules/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { PropsWithSx } from "types/PropsWithSx";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationTeamListItem from "components/molecules/OrganizationTeamListItem/OrganizationTeamListItem";
import CreateOrganizationTeamButton from "components/molecules/CreateOrganizationTeamButton/CreateOrganizationTeamButton";

export type OrganizationMembersProps = PropsWithSx & {
  organizationName: string;
};

function OrganizationTeams({ organizationName, sx }: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

  const { teams } = useCurrentUser();

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
        {formatMessage({ id: "organization.teams.title" })}
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
              id: "organization.teams.search-placeholder",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <CreateOrganizationTeamButton organizationName={organizationName} />
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
          <List>
            {teams &&
              teams
                .filter((team) =>
                  team.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((team) => (
                  <OrganizationTeamListItem
                    key={team.id}
                    team={team}
                    organizationName={organizationName}
                    showDelete={teams.length > 1}
                  />
                ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationTeams;

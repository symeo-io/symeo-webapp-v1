import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Box, Divider, InputAdornment, List, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import TextField from "components/molecules/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CreateOrganizationApiKeyButton from "components/molecules/CreateOrganizationApiKeyButton/CreateOrganizationApiKeyButton";
import OrganizationApiKeyListItem from "components/molecules/OrganizationApiKeyListItem/OrganizationApiKeyListItem";
import { useGetOrganizationApiKeysQuery } from "redux/api/organizations/organizations.api";

export type OrganizationMembersProps = PropsWithSx & {
  organizationName: string;
};

function OrganizationApiKeys({
  organizationName,
  sx,
}: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: apiKeysData } = useGetOrganizationApiKeysQuery();
  const apiKeys = useMemo(
    () => (apiKeysData ? apiKeysData.api_keys : []),
    [apiKeysData]
  );

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
        {formatMessage({ id: "organization.api-keys.title" })}
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
              id: "organization.api-keys.search-placeholder",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <CreateOrganizationApiKeyButton organizationName={organizationName} />
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
          <List>
            {apiKeys &&
              apiKeys
                .filter((apiKey) =>
                  apiKey.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((apiKey) => (
                  <OrganizationApiKeyListItem
                    key={apiKey.id}
                    apiKey={apiKey}
                    organizationName={organizationName}
                  />
                ))}
          </List>
          {apiKeysData && apiKeys.length === 0 && <Box></Box>}
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationApiKeys;

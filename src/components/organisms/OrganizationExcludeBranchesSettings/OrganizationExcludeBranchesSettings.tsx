import { Box, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import TextField from "components/molecules/TextField/TextField";

export type OrganizationExcludeBranchesSettingsProps = PropsWithSx & {
  branchRegexesToExcludeValue: string[];
  setBranchRegexesToExcludeValue: (value: string[]) => void;
};

function OrganizationExcludeBranchesSettings({
  sx,
  branchRegexesToExcludeValue,
  setBranchRegexesToExcludeValue,
}: OrganizationExcludeBranchesSettingsProps) {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(1),
        ...sx,
      }}
    >
      <Typography variant="h3">
        {formatMessage({
          id: "organization.advanced.exclude-branches.title",
        })}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      >
        {formatMessage({
          id: "organization.advanced.exclude-branches.message",
        })}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
        <TextField
          multiline
          fullWidth
          value={branchRegexesToExcludeValue.join("\n")}
          onChange={(event) =>
            setBranchRegexesToExcludeValue(event.target.value.split("\n"))
          }
        />
      </Box>
    </Box>
  );
}

export default OrganizationExcludeBranchesSettings;

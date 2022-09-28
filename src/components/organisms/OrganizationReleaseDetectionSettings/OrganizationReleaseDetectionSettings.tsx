import { Box, Typography } from "@mui/material";
import RadioWithTextField from "components/molecules/RadioWithTextField/RadioWithTextField";
import React from "react";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { ReleaseDetectionStrategy } from "components/organisms/OrganizationAdvancedSettings/OrganizationAdvancedSettings";

export type OrganizationReleaseDetectionSettingsProps = PropsWithSx & {
  selectedReleaseDetection: ReleaseDetectionStrategy;
  setSelectedReleaseDetection: (value: ReleaseDetectionStrategy) => void;
  branchValue: string;
  setBranchValue: (value: string) => void;
  tagsValue: string;
  setTagsValue: (value: string) => void;
};

function OrganizationReleaseDetectionSettings({
  sx,
  selectedReleaseDetection,
  setSelectedReleaseDetection,
  branchValue,
  setBranchValue,
  tagsValue,
  setTagsValue,
}: OrganizationReleaseDetectionSettingsProps) {
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
          id: "organization.advanced.releases-detection.title",
        })}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      >
        {formatMessage({
          id: "organization.advanced.releases-detection.message",
        })}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
        <RadioWithTextField
          checked={selectedReleaseDetection === "branch"}
          onSelect={setSelectedReleaseDetection}
          radioValue="branch"
          title={formatMessage({
            id: "organization.advanced.releases-detection.branch.title",
          })}
          message={formatMessage({
            id: "organization.advanced.releases-detection.branch.message",
          })}
          fieldValue={branchValue}
          setFieldValue={setBranchValue}
        />
        <RadioWithTextField
          sx={{ marginTop: (theme) => theme.spacing(2) }}
          checked={selectedReleaseDetection === "tags"}
          onSelect={setSelectedReleaseDetection}
          radioValue="tags"
          title={formatMessage({
            id: "organization.advanced.releases-detection.tags.title",
          })}
          message={formatMessage({
            id: "organization.advanced.releases-detection.tags.message",
          })}
          fieldValue={tagsValue}
          setFieldValue={setTagsValue}
        />
      </Box>
    </Box>
  );
}

export default OrganizationReleaseDetectionSettings;

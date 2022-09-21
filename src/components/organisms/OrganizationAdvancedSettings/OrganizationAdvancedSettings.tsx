import React, { useCallback, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import RadioWithTextField from "components/molecules/RadioWithTextField/RadioWithTextField";
import { OrganizationSettings } from "redux/api/organizations/organizations.types";
import Button from "components/atoms/Button/Button";
import { useUpdateOrganizationSettingsMutation } from "redux/api/organizations/organizations.api";

export type ReleaseDetectionStrategy = "branch" | "tags";

export type OrganizationMembersProps = PropsWithSx & {
  settings: OrganizationSettings;
};

const BRANCH_REGEX_DEFAULT_VALUE = "^master$";
const TAGS_REGEX_DEFAULT_VALUE = ".*";

function OrganizationAdvancedSettings({
  sx,
  settings,
}: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  const [updateOrganizationSettings, { isLoading }] =
    useUpdateOrganizationSettingsMutation();

  const deployDetectionSettings = settings.delivery.deploy_detection;

  const [selectedReleaseDetection, setSelectedReleaseDetection] =
    useState<ReleaseDetectionStrategy>(
      deployDetectionSettings.tag_regex !== null ? "tags" : "branch"
    );

  const [branchValue, setBranchValue] = useState<string>(
    deployDetectionSettings.pull_request_merged_on_branch_regex ??
      BRANCH_REGEX_DEFAULT_VALUE
  );
  const [tagsValue, setTagsValue] = useState<string>(
    deployDetectionSettings.tag_regex ?? TAGS_REGEX_DEFAULT_VALUE
  );

  const handleReset = useCallback(() => {
    setBranchValue(BRANCH_REGEX_DEFAULT_VALUE);
    setTagsValue(TAGS_REGEX_DEFAULT_VALUE);
  }, []);

  const handleSave = useCallback(() => {
    updateOrganizationSettings({
      id: settings.id,
      delivery: {
        deploy_detection: {
          pull_request_merged_on_branch_regex:
            selectedReleaseDetection === "branch" ? branchValue : null,
          tag_regex: selectedReleaseDetection === "tags" ? tagsValue : null,
        },
      },
    });
  }, [
    branchValue,
    selectedReleaseDetection,
    settings.id,
    tagsValue,
    updateOrganizationSettings,
  ]);

  return (
    <Box sx={sx}>
      <Typography
        variant="h2"
        sx={{ paddingBottom: (theme) => theme.spacing(1) }}
      >
        {formatMessage({ id: "organization.advanced.title" })}
      </Typography>
      <Divider />
      <Box
        sx={{
          padding: (theme) => theme.spacing(1),
          marginTop: (theme) => theme.spacing(2),
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            marginTop: (theme) => theme.spacing(2),
          }}
        >
          <Button variant="outlined" onClick={handleReset}>
            {formatMessage({
              id: "organization.advanced.releases-detection.reset",
            })}
          </Button>
          <Button
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
            onClick={handleSave}
            loading={isLoading}
          >
            {formatMessage({
              id: "organization.advanced.releases-detection.save",
            })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationAdvancedSettings;

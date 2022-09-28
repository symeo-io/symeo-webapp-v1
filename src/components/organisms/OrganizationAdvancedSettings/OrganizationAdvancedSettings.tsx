import React, { useCallback, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { OrganizationSettings } from "redux/api/organizations/organizations.types";
import OrganizationReleaseDetectionSettings from "components/organisms/OrganizationReleaseDetectionSettings/OrganizationReleaseDetectionSettings";
import OrganizationExcludeBranchesSettings from "components/organisms/OrganizationExcludeBranchesSettings/OrganizationExcludeBranchesSettings";
import { api, dataTagTypes } from "redux/api/api";
import { useUpdateOrganizationSettingsMutation } from "redux/api/organizations/organizations.api";
import Button from "components/atoms/Button/Button";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

export type ReleaseDetectionStrategy = "branch" | "tags";

const BRANCH_REGEX_DEFAULT_VALUE = "^master$";
const TAGS_REGEX_DEFAULT_VALUE = ".*";
const BRANCH_REGEXES_TO_EXCLUDE_DEFAULT_VALUE = ["^staging$", "^main$"];

export type OrganizationMembersProps = PropsWithSx & {
  settings: OrganizationSettings;
};

function OrganizationAdvancedSettings({
  sx,
  settings,
}: OrganizationMembersProps) {
  const dispatch = useDispatch();
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
  const [branchRegexesToExcludeValue, setBranchRegexesToExcludeValue] =
    useState<string[]>(
      deployDetectionSettings.branch_regexes_to_exclude ??
        BRANCH_REGEXES_TO_EXCLUDE_DEFAULT_VALUE
    );

  const handleReset = useCallback(() => {
    setBranchValue(BRANCH_REGEX_DEFAULT_VALUE);
    setTagsValue(TAGS_REGEX_DEFAULT_VALUE);
    setBranchRegexesToExcludeValue(BRANCH_REGEXES_TO_EXCLUDE_DEFAULT_VALUE);
  }, []);

  const handleSave = useCallback(async () => {
    await updateOrganizationSettings({
      id: settings.id,
      delivery: {
        deploy_detection: {
          pull_request_merged_on_branch_regex:
            selectedReleaseDetection === "branch" ? branchValue : null,
          tag_regex: selectedReleaseDetection === "tags" ? tagsValue : null,
          branch_regexes_to_exclude: branchRegexesToExcludeValue,
        },
      },
    });
    enqueueSnackbar(
      formatMessage({
        id: `organization.advanced.settings-saved-message`,
      }),
      { variant: "success" }
    );
    dispatch(api.util.invalidateTags(dataTagTypes));
  }, [
    branchRegexesToExcludeValue,
    branchValue,
    dispatch,
    formatMessage,
    selectedReleaseDetection,
    settings.id,
    tagsValue,
    updateOrganizationSettings,
  ]);

  return (
    <Box sx={{ paddingBottom: (theme) => theme.spacing(8), ...sx }}>
      <Typography
        variant="h2"
        sx={{ paddingBottom: (theme) => theme.spacing(1) }}
      >
        {formatMessage({ id: "organization.advanced.title" })}
      </Typography>
      <Divider />
      <OrganizationReleaseDetectionSettings
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
        selectedReleaseDetection={selectedReleaseDetection}
        setSelectedReleaseDetection={setSelectedReleaseDetection}
        branchValue={branchValue}
        setBranchValue={setBranchValue}
        tagsValue={tagsValue}
        setTagsValue={setTagsValue}
      />
      <Divider
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      />
      <OrganizationExcludeBranchesSettings
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
        branchRegexesToExcludeValue={branchRegexesToExcludeValue}
        setBranchRegexesToExcludeValue={setBranchRegexesToExcludeValue}
      />
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
  );
}

export default OrganizationAdvancedSettings;

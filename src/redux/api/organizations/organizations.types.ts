import { ResponseWithErrors } from "redux/api/errors.type";

export type OrganizationUser = {
  id: string;
  email: string;
  status: "ACTIVE" | "PENDING";
};

export type DeployDetectionSettings = {
  pull_request_merged_on_branch_regex: string | null;
  tag_regex: string | null;
  branch_regexes_to_exclude: string[];
  deploy_detection_type: "pull_request" | "tag";
};

export type DeliverySettings = {
  deploy_detection: DeployDetectionSettings;
};

export type OrganizationSettings = {
  id: string;
  delivery: DeliverySettings;
};

export type UpdateOrganizationSettingsInput = OrganizationSettings;

export type GetOrganizationSettingsResponse = ResponseWithErrors & {
  settings: OrganizationSettings;
};

export type GetOrganizationUsersResponse = ResponseWithErrors & {
  users: OrganizationUser[];
};

export type InviteUsersToOrganizationInput = { email: string }[];

export type InviteUsersToOrganizationResponse = ResponseWithErrors & {
  users: OrganizationUser[];
};

export type ApiKey = {
  id: string;
  name: string;
  value: string;
};

export type CreateOrganizationApiKeyInput = { name: string };
export type CreateOrganizationApiKeyResponse = ResponseWithErrors & {
  api_key: ApiKey;
};

export type GetOrganizationApiKeysResponse = ResponseWithErrors & {
  api_keys: ApiKey[];
};

export type DeleteOrganizationApiKeyInput = { apiKeyId: string };
export type DeleteOrganizationApiKeyResponse = ResponseWithErrors;

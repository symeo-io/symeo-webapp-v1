import { ResponseWithErrors } from "redux/api/errors.type";

export type OrganizationUser = {
  id: string;
  email: string;
  status: "ACTIVE" | "PENDING";
};

export type DeployDetectionSettings = {
  pull_request_merged_on_branch_regex: string | null;
  tag_regex: string | null;
};

export type DeliverySettings = {
  deploy_detection: DeployDetectionSettings;
};

export type OrganizationSettings = {
  delivery: DeliverySettings;
};

export type UpdateOrganizationSettingsInput = {
  settings: OrganizationSettings;
};

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

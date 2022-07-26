import { ResponseWithErrors } from "redux/api/errors.type";

export type OrganizationUser = {
  id: string;
  email: string;
  status: "ACTIVE" | "PENDING";
};

export type GetOrganizationUsersResponse = ResponseWithErrors & {
  users: OrganizationUser[];
};

export type InviteUsersToOrganizationInput = { email: string }[];

export type InviteUsersToOrganizationResponse = ResponseWithErrors & {
  users: OrganizationUser[];
};

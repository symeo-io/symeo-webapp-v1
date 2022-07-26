import { ResponseWithErrors } from "redux/api/errors.type";

export type OrganizationUser = {
  id: string;
  email: string;
  status: "ACTIVE" | "PENDING";
};

export type GetOrganizationUsersResponse = ResponseWithErrors & {
  users: OrganizationUser[];
};

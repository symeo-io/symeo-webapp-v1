import { Error } from "../errors.type";

export type Organization = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  email: string;
  organization?: Organization;
};

export type CurrentUserResponse = {
  user: User;
  errors?: Error[];
};

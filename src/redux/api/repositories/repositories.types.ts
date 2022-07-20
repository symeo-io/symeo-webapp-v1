import { Error } from "../errors.type";

export type Repository = {
  id: number;
  name: string;
};

export type GetRepositoriesResponse = {
  repositories: Repository[];
  errors?: Error[];
};

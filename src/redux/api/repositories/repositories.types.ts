import { ResponseWithErrors } from "../errors.type";

export type Repository = {
  id: number;
  name: string;
};

export type GetRepositoriesResponse = ResponseWithErrors & {
  repositories: Repository[];
};

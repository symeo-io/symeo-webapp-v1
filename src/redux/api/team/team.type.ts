import { Error } from "../errors.type";

export type Team = {
  id: string;
  name: string;
  repository_ids: number[];
};

export type CreateTeamInput = Omit<Team, "id">;

export type CreateTeamResponse = {
  team: Team;
  errors?: Error[];
};

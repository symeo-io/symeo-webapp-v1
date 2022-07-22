import { Error } from "../errors.type";
import { CreateTeamFormValues } from "components/organisms/CreateTeamForm/CreateTeamForm";

export type Team = {
  id: string;
  name: string;
  repository_ids: number[];
};

export type CreateTeamsInput = Omit<Team, "id">[];

export type CreateTeamsResponse = {
  teams: Team[];
  errors?: Error[];
};

export type GetTeamsResponse = {
  teams: Team[];
  errors?: Error[];
};

export function formValuesToCreateTeamInput(
  formValues: CreateTeamFormValues[]
): CreateTeamsInput {
  return formValues.map((value) => ({
    name: value.name,
    repository_ids: value.repositories.map((repo) => repo.id),
  }));
}

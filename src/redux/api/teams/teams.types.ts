import { Error } from "../errors.type";
import { CreateTeamFormValues } from "components/organisms/CreateTeamForm/CreateTeamForm";

export type Team = {
  id: string;
  name: string;
  repository_ids: number[];
};

export type CreateTeamInput = Omit<Team, "id">[];

export type CreateTeamResponse = {
  team: Team[];
  errors?: Error[];
};

export function formValuesToCreateTeamInput(
  formValues: CreateTeamFormValues[]
): CreateTeamInput {
  return formValues.map((value) => ({
    name: value.name,
    repository_ids: value.repositories.map((repo) => repo.id),
  }));
}

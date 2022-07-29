import { ResponseWithErrors } from "../errors.type";
import { EditOrCreateTeamFormValues } from "components/organisms/CreateTeamForm/CreateTeamForm";

export type Team = {
  id: string;
  name: string;
  repository_ids: number[];
};

export type CreateTeamsInput = Omit<Team, "id">[];

export type CreateTeamsResponse = ResponseWithErrors & {
  teams: Team[];
};

export type DeleteTeamsInput = {
  teamId: string;
};

export type DeleteTeamsResponse = ResponseWithErrors;

export type EditTeamInput = Pick<Team, "id"> & Partial<Omit<Team, "id">>;

export type EditTeamResponse = ResponseWithErrors;

export type GetTeamsResponse = ResponseWithErrors & {
  teams: Team[];
};

export function formValuesToCreateTeamInput(
  formValues: EditOrCreateTeamFormValues[]
): CreateTeamsInput {
  return formValues.map((value) => ({
    name: value.name,
    repository_ids: value.repositoryIds,
  }));
}

export function formValuesToEditTeamInput(
  id: string,
  formValues: EditOrCreateTeamFormValues
): EditTeamInput {
  return {
    id,
    name: formValues.name,
    repository_ids: formValues.repositoryIds,
  };
}

export function teamToFormValues(team: Team): EditOrCreateTeamFormValues {
  return {
    name: team.name,
    repositoryIds: team.repository_ids,
  };
}

import { EditOrCreateTeamFormValues } from "./CreateTeamForm";
import cloneDeep from "lodash/cloneDeep";

export type FormErrors<Values> = Record<keyof Values, string[]>;

export const EMPTY_TEAM: EditOrCreateTeamFormValues = {
  name: "",
  repositoryIds: [],
};

export const EMPTY_TEAM_FORM_ERRORS = {
  name: [],
  repositoryIds: [],
};

export function isErrorsEmpty(errors: FormErrors<any>): boolean {
  for (const element of Object.values(errors)) {
    if (element.length !== 0) {
      return false;
    }
  }
  return true;
}

export function getTeamFormErrors(
  values: EditOrCreateTeamFormValues
): FormErrors<EditOrCreateTeamFormValues> {
  const errors: FormErrors<EditOrCreateTeamFormValues> = cloneDeep(
    EMPTY_TEAM_FORM_ERRORS
  );

  if (!values.name) {
    errors.name.push("on-boarding.create-teams.form.errors.empty-name");
  }

  if (values.repositoryIds.length === 0) {
    errors.repositoryIds.push(
      "on-boarding.create-teams.form.errors.empty-repositories"
    );
  }

  return errors;
}

export function isErrorsListEmpty(errorsList: FormErrors<any>[]): boolean {
  for (const errors of errorsList) {
    if (!isErrorsEmpty(errors)) {
      return false;
    }
  }
  return true;
}

export function getTeamsFormErrors(
  values: EditOrCreateTeamFormValues[]
): FormErrors<EditOrCreateTeamFormValues>[] {
  return values.map((value) => getTeamFormErrors(value));
}

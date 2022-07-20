import { CreateTeamFormValues } from "./CreateTeamForm";
import cloneDeep from "lodash/cloneDeep";

export type FormErrors<Values> = Record<keyof Values, string[]>;

export const emptyTeamFormErrors = {
  name: [],
  repositories: [],
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
  values: CreateTeamFormValues
): FormErrors<CreateTeamFormValues> {
  const errors: FormErrors<CreateTeamFormValues> =
    cloneDeep(emptyTeamFormErrors);

  if (!values.name) {
    errors.name.push("on-boarding.create-teams.form.errors.empty-name");
  }

  if (values.repositories.length === 0) {
    errors.repositories.push(
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
  values: CreateTeamFormValues[]
): FormErrors<CreateTeamFormValues>[] {
  return values.map((value) => getTeamFormErrors(value));
}

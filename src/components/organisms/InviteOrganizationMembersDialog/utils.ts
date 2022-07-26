import * as EmailValidator from "email-validator";

export function validateEmails(emails: string[]): string[] {
  const errors: string[] = [];

  const isOneEmailNotEmpty = emails.find((email) => email !== "");

  if (!isOneEmailNotEmpty) {
    return ["organization.members.invite-dialog.errors.empty"];
  }

  emails.forEach((email, index) => {
    if (email !== "" && !EmailValidator.validate(email)) {
      errors[index] = "organization.members.invite-dialog.errors.invalid-email";
    }
  });

  return errors;
}

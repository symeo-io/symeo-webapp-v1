import React, { ChangeEvent, useCallback, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useIntl } from "react-intl";
import TextField from "components/molecules/TextField/TextField";
import AddIcon from "@mui/icons-material/Add";
import { validateEmails } from "components/organisms/InviteOrganizationMembersDialog/utils";
import { useInviteUserToOrganizationMutation } from "redux/api/organizations/organizations.api";
import { PropsWithSx } from "types/PropsWithSx";
import cloneDeep from "lodash/cloneDeep";

export type InviteOrganizationMembersDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
  organizationName: string;
};

const INITIAL_EMAILS_LIST = ["", "", "", "", ""];

function InviteOrganizationMembersDialog({
  open,
  handleClose,
  organizationName,
  sx,
}: InviteOrganizationMembersDialogProps) {
  const { formatMessage } = useIntl();
  const [emails, setEmails] = useState<string[]>(
    cloneDeep(INITIAL_EMAILS_LIST)
  );
  const [errors, setErrors] = useState<(string | undefined)[]>([]);
  const [inviteUser, { isLoading }] = useInviteUserToOrganizationMutation();

  const setEmail = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newEmails = [...emails];
      newEmails[index] = event.target.value;
      setEmails(newEmails);

      // Resetting error when updating field
      const newErrors = [...errors];
      newErrors[index] = undefined;
      setErrors(newErrors);
    },
    [emails, errors]
  );

  const addEmail = useCallback(() => setEmails([...emails, ""]), [emails]);

  const reset = useCallback(() => {
    setEmails(cloneDeep(INITIAL_EMAILS_LIST));
    setErrors([]);
  }, []);

  const handleInvite = useCallback(async () => {
    const newErrors = validateEmails(emails);
    setErrors(newErrors);

    if (newErrors.length === 0) {
      await inviteUser(
        emails
          .filter((email) => email !== "")
          .map((email) => ({
            email,
          }))
      );
      handleClose();
      reset();
    }
  }, [emails, handleClose, inviteUser, reset]);

  const handleCloseAndReset = useCallback(() => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  return (
    <Dialog open={open} onClose={handleCloseAndReset} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <MailOutlineIcon sx={{ marginRight: (theme) => theme.spacing(1) }} />
        {formatMessage(
          { id: "organization.members.invite-dialog.title" },
          { organizationName }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          height: "400px",
          overflow: "auto",
        }}
      >
        {emails.map((email, index) => (
          <TextField
            key={index}
            value={email}
            onChange={setEmail(index)}
            error={!!errors[index]}
            helperText={errors[index] && formatMessage({ id: errors[index] })}
            label={
              index === 0
                ? formatMessage({
                    id: "organization.members.invite-dialog.email-field-label",
                  })
                : undefined
            }
            required={index === 0}
            placeholder={formatMessage({
              id: "organization.members.invite-dialog.email-field-placeholder",
            })}
            sx={{ marginBottom: (theme) => theme.spacing(1) }}
          />
        ))}
        <IconButton
          onClick={addEmail}
          sx={{ marginTop: (theme) => theme.spacing(1) }}
        >
          <AddIcon />
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAndReset}
          variant="outlined"
          disabled={isLoading}
        >
          {formatMessage({ id: "confirm.cancel" })}
        </Button>
        <Button onClick={handleInvite} loading={isLoading}>
          {formatMessage({
            id: "organization.members.invite-dialog.invite-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteOrganizationMembersDialog;

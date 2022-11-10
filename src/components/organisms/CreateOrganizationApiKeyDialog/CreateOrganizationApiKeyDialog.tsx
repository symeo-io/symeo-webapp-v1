import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import GroupsIcon from "@mui/icons-material/Groups";
import { useCreateOrganizationApiKeyMutation } from "redux/api/organizations/organizations.api";
import { CreateOrganizationApiKeyResponse } from "redux/api/organizations/organizations.types";
import TextField from "components/molecules/TextField/TextField";

function getErrorsForApiKeyForm(name: string): string[] {
  const errors: string[] = [];

  if (!name) {
    errors.push("organization.api-keys.create-dialog.errors.empty-name");
  }

  return errors;
}

export type CreateOrganizationApiKeyDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
  organizationName: string;
};

function CreateOrganizationApiKeyDialog({
  open,
  handleClose,
  organizationName,
  sx,
}: CreateOrganizationApiKeyDialogProps) {
  const { formatMessage } = useIntl();
  const [name, setName] = useState<string>("");
  const [keyValue, setKeyValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [createApiKey, { isLoading: isLoadingCreate }] =
    useCreateOrganizationApiKeyMutation();

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Allow editing only if key not created yet
      if (keyValue === null) {
        setName(event.target.value);
        setErrors([]); // Resetting errors when editing field
      }
    },
    [keyValue]
  );

  const reset = useCallback(() => {
    setName("");
    setKeyValue(null);
    setErrors([]);
  }, []);

  const handleCreate = useCallback(async () => {
    const errors = getErrorsForApiKeyForm(name);
    setErrors(errors);

    if (errors.length === 0) {
      const { data } = (await createApiKey({ name })) as {
        data: CreateOrganizationApiKeyResponse;
      };

      setKeyValue(data.api_key.value);
    }
  }, [createApiKey, name]);

  const handleCloseAndReset = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  return (
    <Dialog open={open} onClose={handleCloseAndReset} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <GroupsIcon sx={{ marginRight: (theme) => theme.spacing(1) }} />
        {formatMessage(
          {
            id: "organization.api-keys.create-dialog.title",
          },
          { organizationName }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          height: "300px",
          overflow: "auto",
        }}
      >
        <TextField
          name="name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          required
          label={formatMessage({
            id: "organization.api-keys.create-dialog.name-field-label",
          })}
          placeholder={formatMessage({
            id: "organization.api-keys.create-dialog.name-field-placeholder",
          })}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          error={errors.length > 0}
          helperText={
            errors.length > 0
              ? errors.map((error) => formatMessage({ id: error })).join(", ")
              : undefined
          }
        />
        {keyValue !== null && (
          <TextField
            name="value"
            value={keyValue}
            fullWidth
            label={formatMessage({
              id: "organization.api-keys.create-dialog.value-field-label",
            })}
            helperText={formatMessage({
              id: "organization.api-keys.create-dialog.value-field-helper",
            })}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {keyValue === null && (
          <>
            <Button
              onClick={handleCloseAndReset}
              variant="outlined"
              disabled={isLoadingCreate}
            >
              {formatMessage({ id: "confirm.cancel" })}
            </Button>
            <Button onClick={handleCreate} loading={isLoadingCreate}>
              {formatMessage({
                id: "organization.api-keys.create-dialog.create-button-label",
              })}
            </Button>
          </>
        )}
        {keyValue !== null && (
          <Button onClick={handleCloseAndReset} variant="outlined">
            {formatMessage({ id: "confirm.close" })}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CreateOrganizationApiKeyDialog;

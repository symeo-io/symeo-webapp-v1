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
import {
  useCreateTeamsMutation,
  useEditTeamMutation,
} from "redux/api/teams/teams.api";
import CreateTeamForm, {
  EditOrCreateTeamFormValues,
} from "components/organisms/CreateTeamForm/CreateTeamForm";
import cloneDeep from "lodash/cloneDeep";
import {
  EMPTY_TEAM,
  EMPTY_TEAM_FORM_ERRORS,
  FormErrors,
  getTeamFormErrors,
  isErrorsEmpty,
} from "components/organisms/CreateTeamForm/utils";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  formValuesToCreateTeamInput,
  formValuesToEditTeamInput,
  Team,
  teamToFormValues,
} from "redux/api/teams/teams.types";

export type CreateOrganizationTeamDialogProps = PropsWithSx & {
  team?: Team;
  open: boolean;
  handleClose: () => void;
  organizationName: string;
};

function EditOrCreateOrganizationTeamDialog({
  team,
  open,
  handleClose,
  organizationName,
  sx,
}: CreateOrganizationTeamDialogProps) {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState<EditOrCreateTeamFormValues>(
    team ? teamToFormValues(team) : cloneDeep(EMPTY_TEAM)
  );
  const [errors, setErrors] = useState<FormErrors<EditOrCreateTeamFormValues>>(
    cloneDeep(EMPTY_TEAM_FORM_ERRORS)
  );
  const [createTeams, { isLoading: isLoadingCreate }] =
    useCreateTeamsMutation();
  const [editTeam, { isLoading: isLoadingEdit }] = useEditTeamMutation();

  const reset = useCallback(() => {
    setValue(cloneDeep(EMPTY_TEAM));
    setErrors(cloneDeep(EMPTY_TEAM_FORM_ERRORS));
  }, []);

  const handleEditOrCreate = useCallback(async () => {
    const errors = getTeamFormErrors(value);
    setErrors(errors);

    if (isErrorsEmpty(errors)) {
      if (team) {
        await editTeam(formValuesToEditTeamInput(team.id, value));
      } else {
        await createTeams(formValuesToCreateTeamInput([value]));
        reset();
      }
      handleClose();
    }
  }, [createTeams, editTeam, handleClose, reset, team, value]);

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
            id: team
              ? "organization.teams.edit-dialog.title"
              : "organization.teams.create-dialog.title",
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
        <CreateTeamForm
          values={value}
          setValues={setValue}
          errors={errors}
          setErrors={setErrors}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAndReset}
          variant="outlined"
          disabled={isLoadingCreate || isLoadingEdit}
        >
          {formatMessage({ id: "confirm.cancel" })}
        </Button>
        <Button
          onClick={handleEditOrCreate}
          loading={isLoadingCreate || isLoadingEdit}
        >
          {formatMessage({
            id: team
              ? "organization.teams.edit-dialog.edit-button-label"
              : "organization.teams.create-dialog.create-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditOrCreateOrganizationTeamDialog;

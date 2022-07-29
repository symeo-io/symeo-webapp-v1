import React, { useCallback, useState } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import EditOrCreateOrganizationTeamDialog, {
  CreateOrganizationTeamDialogProps,
} from "components/organisms/EditOrCreateOrganizationTeamDialog/EditOrCreateOrganizationTeamDialog";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Team } from "redux/api/teams/teams.types";

export type CreateOrganizationTeamButtonProps = PropsWithSx & {
  team: Team;
  organizationName: string;
  dialogSx?: CreateOrganizationTeamDialogProps["sx"];
};

function EditOrganizationTeamButton({
  organizationName,
  sx,
  dialogSx,
}: CreateOrganizationTeamButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <IconButton sx={sx} onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <EditOrCreateOrganizationTeamDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        organizationName={organizationName}
        sx={dialogSx}
      />
    </>
  );
}

export default EditOrganizationTeamButton;

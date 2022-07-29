import React, { useCallback, useState } from "react";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import EditOrCreateOrganizationTeamDialog, {
  CreateOrganizationTeamDialogProps,
} from "components/organisms/EditOrCreateOrganizationTeamDialog/EditOrCreateOrganizationTeamDialog";

export type CreateOrganizationTeamButtonProps = PropsWithSx & {
  organizationName: string;
  dialogSx?: CreateOrganizationTeamDialogProps["sx"];
};

function CreateOrganizationTeamButton({
  organizationName,
  sx,
  dialogSx,
}: CreateOrganizationTeamButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button sx={sx} onClick={handleOpenDialog}>
        {formatMessage({ id: "organization.teams.create-button-label" })}
      </Button>
      <EditOrCreateOrganizationTeamDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        organizationName={organizationName}
        sx={dialogSx}
      />
    </>
  );
}

export default CreateOrganizationTeamButton;

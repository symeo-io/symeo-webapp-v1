import React, { useCallback, useState } from "react";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import CreateOrganizationTeamDialog, {
  CreateOrganizationTeamDialogProps,
} from "components/organisms/CreateOrganizationTeamDialog/CreateOrganizationTeamDialog";

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
      <CreateOrganizationTeamDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        organizationName={organizationName}
        sx={dialogSx}
      />
    </>
  );
}

export default CreateOrganizationTeamButton;

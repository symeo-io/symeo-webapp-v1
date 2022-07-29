import React, { useCallback, useState } from "react";
import Button from "components/atoms/Button/Button";
import InviteOrganizationMembersDialog, {
  InviteOrganizationMembersDialogProps,
} from "components/organisms/InviteOrganizationMembersDialog/InviteOrganizationMembersDialog";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";

export type InviteOrganizationMembersButtonProps = PropsWithSx & {
  organizationName: string;
  dialogSx?: InviteOrganizationMembersDialogProps["sx"];
};

function InviteOrganizationMembersButton({
  organizationName,
  sx,
  dialogSx,
}: InviteOrganizationMembersButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button sx={sx} onClick={handleOpenDialog}>
        {formatMessage({ id: "organization.members.invite-button-label" })}
      </Button>
      <InviteOrganizationMembersDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        organizationName={organizationName}
        sx={dialogSx}
      />
    </>
  );
}

export default InviteOrganizationMembersButton;

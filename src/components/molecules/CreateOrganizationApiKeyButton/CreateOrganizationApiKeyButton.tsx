import React, { useCallback, useState } from "react";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import CreateOrganizationApiKeyDialog from "components/organisms/CreateOrganizationApiKeyDialog/CreateOrganizationApiKeyDialog";

export type CreateOrganizationApiKeyButtonProps = PropsWithSx & {
  organizationName: string;
  dialogSx?: PropsWithSx["sx"];
};

function CreateOrganizationApiKeyButton({
  organizationName,
  sx,
  dialogSx,
}: CreateOrganizationApiKeyButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button sx={sx} onClick={handleOpenDialog}>
        {formatMessage({ id: "organization.api-keys.create-button-label" })}
      </Button>
      <CreateOrganizationApiKeyDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        organizationName={organizationName}
        sx={dialogSx}
      />
    </>
  );
}

export default CreateOrganizationApiKeyButton;

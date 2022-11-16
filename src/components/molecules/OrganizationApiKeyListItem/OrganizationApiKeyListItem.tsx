import React from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIntl } from "react-intl";
import { useConfirm } from "providers/confirm/useConfirm";
import { PropsWithSx } from "types/PropsWithSx";
import { ApiKey } from "redux/api/organizations/organizations.types";
import { useDeleteOrganizationApiKeyMutation } from "redux/api/organizations/organizations.api";

export type OrganizationApiKeyListItemProps = PropsWithSx & {
  apiKey: ApiKey;
  organizationName: string;
};

function OrganizationApiKeyListItem({
  apiKey,
  organizationName,
  sx,
}: OrganizationApiKeyListItemProps) {
  const { formatMessage } = useIntl();
  const [deleteApiKey] = useDeleteOrganizationApiKeyMutation();

  const { handleOpen: openConfirmDelete } = useConfirm({
    title: formatMessage(
      { id: "organization.api-keys.remove-dialog.title" },
      { organizationName }
    ),
    message: formatMessage(
      { id: "organization.api-keys.remove-dialog.message" },
      { teamName: apiKey.name }
    ),
    confirmButton: {
      label: formatMessage({
        id: "organization.api-keys.remove-dialog.confirm-label",
      }),
      color: "error",
      onClick: () => deleteApiKey({ apiKeyId: apiKey.id }),
    },
  });

  return (
    <ListItem
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        ...sx,
      }}
      secondaryAction={
        <>
          <IconButton
            onClick={openConfirmDelete}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "1rem",
          },
          flex: 1,
        }}
        primary={apiKey.name}
      />
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "1rem",
          },
          flex: "unset",
          marginRight: (theme) => theme.spacing(5),
        }}
        primary={apiKey.value}
      />
    </ListItem>
  );
}

export default OrganizationApiKeyListItem;

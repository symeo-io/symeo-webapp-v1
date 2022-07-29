import React, { useMemo } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { OrganizationUser } from "redux/api/organizations/organizations.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { avatarColorPalettes } from "theme/colors";
import Status from "components/atoms/Status/Status";
import { useIntl } from "react-intl";
import { useConfirm } from "providers/confirm/useConfirm";
import { useDeleteUserFromOrganizationMutation } from "redux/api/organizations/organizations.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { PropsWithSx } from "types/PropsWithSx";

function getAvatarColorPalette(name: string) {
  let sumOfCharacterCodes = 0;

  for (let i = 0; i < name.length; i++) {
    sumOfCharacterCodes += name.charCodeAt(i);
  }

  const paletteIndex = sumOfCharacterCodes % avatarColorPalettes.length;

  return avatarColorPalettes[paletteIndex];
}

export type OrganizationMemberListItemProps = PropsWithSx & {
  user: OrganizationUser;
  organizationName: string;
};

function OrganizationMemberListItem({
  user,
  organizationName,
  sx,
}: OrganizationMemberListItemProps) {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const [deleteUser] = useDeleteUserFromOrganizationMutation();
  const avatarPalette = useMemo(
    () => getAvatarColorPalette(user.email),
    [user.email]
  );

  const { handleOpen: openConfirmDelete } = useConfirm({
    title: formatMessage(
      { id: "organization.members.remove-dialog.title" },
      { organizationName }
    ),
    message: formatMessage(
      { id: "organization.members.remove-dialog.message" },
      { email: user.email }
    ),
    confirmButton: {
      label: formatMessage({
        id: "organization.members.remove-dialog.confirm-label",
      }),
      color: "error",
      onClick: () => deleteUser({ userId: user.id }),
    },
  });

  return (
    <ListItem
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        ...sx,
      }}
      secondaryAction={
        user.email !== currentUser?.email ? (
          <IconButton onClick={openConfirmDelete}>
            <DeleteIcon />
          </IconButton>
        ) : undefined
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={user.email}
          sx={{
            color: avatarPalette[100],
            backgroundColor: avatarPalette[600],
          }}
        >
          {user.email[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "1rem",
          },
        }}
        primary={user.email}
        secondary={
          <>
            <Status
              label={formatMessage({
                id: `organization.members.${user.status}`,
              })}
              variant={user.status === "ACTIVE" ? "success" : "warning"}
            />
            {user.email === currentUser?.email && (
              <Status
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
                label={formatMessage({
                  id: "organization.members.you",
                })}
              />
            )}
          </>
        }
      />
    </ListItem>
  );
}

export default OrganizationMemberListItem;

import React, { useMemo } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import { OrganizationUser } from "redux/api/organizations/organizations.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { avatarColorPalettes } from "theme/colors";
import Status from "components/atoms/Status/Status";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { useIntl } from "react-intl";
import { useConfirm } from "providers/confirm/useConfirm";

function getAvatarColorPalette(name: string) {
  let sumOfCharacterCodes = 0;

  for (let i = 0; i < name.length; i++) {
    sumOfCharacterCodes += name.charCodeAt(i);
  }

  const paletteIndex = sumOfCharacterCodes % avatarColorPalettes.length;

  return avatarColorPalettes[paletteIndex];
}

export type OrganizationMemberListItemProps = {
  sx?: ListItemProps["sx"];
  user: OrganizationUser;
  organizationName: string;
};

function OrganizationMemberListItem({
  user,
  organizationName,
  sx,
}: OrganizationMemberListItemProps) {
  const { formatMessage } = useIntl();
  const { data: currentUserData } = useGetCurrentUserQuery();
  const avatarPalette = useMemo(
    () => getAvatarColorPalette(user.email),
    [user.email]
  );

  const { handleOpen: openConfirmDelete } = useConfirm({
    title: formatMessage(
      { id: "organization.members.remove.title" },
      { organizationName }
    ),
    message: formatMessage(
      { id: "organization.members.remove.message" },
      { email: user.email }
    ),
    confirmButton: {
      label: formatMessage(
        { id: "organization.members.remove.confirm-label" },
        { email: user.email }
      ),
      color: "error",
      onClick: async () => console.log("toto"),
    },
  });

  return (
    <ListItem
      sx={sx}
      secondaryAction={
        user.email !== currentUserData?.user.email ? (
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={openConfirmDelete}
          >
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
            backgroundColor: avatarPalette[800],
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
            {user.email === currentUserData?.user.email && (
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

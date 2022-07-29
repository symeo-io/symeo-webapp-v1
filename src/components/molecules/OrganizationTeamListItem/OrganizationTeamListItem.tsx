import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIntl } from "react-intl";
import { useConfirm } from "providers/confirm/useConfirm";
import { PropsWithSx } from "types/PropsWithSx";
import { Team } from "redux/api/teams/teams.types";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDeleteTeamMutation } from "redux/api/teams/teams.api";
import EditOrganizationTeamButton from "components/molecules/EditOrganizationTeamButton/EditOrganizationTeamButton";

export type OrganizationTeamListItemProps = PropsWithSx & {
  team: Team;
  organizationName: string;
  showDelete?: boolean;
};

function OrganizationTeamListItem({
  team,
  organizationName,
  showDelete = true,
  sx,
}: OrganizationTeamListItemProps) {
  const { formatMessage } = useIntl();
  const [deleteTeam] = useDeleteTeamMutation();

  const { handleOpen: openConfirmDelete } = useConfirm({
    title: formatMessage(
      { id: "organization.teams.remove-dialog.title" },
      { organizationName }
    ),
    message: formatMessage(
      { id: "organization.teams.remove-dialog.message" },
      { teamName: team.name }
    ),
    confirmButton: {
      label: formatMessage({
        id: "organization.teams.remove-dialog.confirm-label",
      }),
      color: "error",
      onClick: () => deleteTeam({ teamId: team.id }),
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
          <EditOrganizationTeamButton
            organizationName={organizationName}
            team={team}
          />
          {showDelete && (
            <IconButton
              onClick={openConfirmDelete}
              sx={{ marginLeft: (theme) => theme.spacing(1) }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <ListItemAvatar>
        <Avatar alt={team.name}>
          <GroupsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "1rem",
          },
        }}
        primary={team.name}
      />
    </ListItem>
  );
}

export default OrganizationTeamListItem;

import React from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Organization } from "redux/api/users/users.types";
import OrganizationAvatar from "components/atoms/OrganizationAvatar/OrganizationAvatar";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors } from "theme/colors";
import { useIntl } from "react-intl";
import GroupsIcon from "@mui/icons-material/Groups";
import { PropsWithSx } from "types/PropsWithSx";

export type OrganizationProps = PropsWithSx & {
  organization: Organization;
};

function CurrentOrganization({ organization, sx }: OrganizationProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam, teams, setSelectedTeam } = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={openMenu}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          cursor: "pointer",
          padding: (theme) => theme.spacing(1),
          "&:hover": {
            background: "rgba(220, 231, 242, 0.35)",
          },
          ...sx,
        }}
      >
        <OrganizationAvatar organization={organization} />
        <Box sx={{ flex: 1, marginLeft: (theme) => theme.spacing(1) }}>
          <Box sx={{ fontWeight: 700 }}>{organization.name}</Box>
          <Box sx={{ fontSize: "14px", color: colors.secondary.text }}>
            {selectedTeam?.name ?? "All"}
          </Box>
        </Box>
        <KeyboardArrowDownIcon />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: "190px",
          },
        }}
      >
        <MenuList
          subheader={<ListSubheader>{organization.name}</ListSubheader>}
        >
          <MenuItem
            selected={!selectedTeam}
            onClick={() => {
              setSelectedTeam(undefined);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText>
              {formatMessage({ id: "sidebar.organization.all-teams-label" })}
            </ListItemText>
          </MenuItem>
          {teams &&
            teams.map((team) => (
              <MenuItem
                key={team.id}
                selected={selectedTeam?.id === team.id}
                onClick={() => {
                  setSelectedTeam(team);
                  closeMenu();
                }}
              >
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText>{team.name}</ListItemText>
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default CurrentOrganization;

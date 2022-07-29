import React from "react";
import { Box, Drawer, MenuList } from "@mui/material";
import CurrentOrganization from "components/molecules/CurrentOrganization/CurrentOrganization";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import HomeIcon from "@mui/icons-material/Home";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import routes from "routing";
import { useIntl } from "react-intl";
import Button from "components/atoms/Button/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import SettingsIcon from "@mui/icons-material/Settings";

export const SIDE_BAR_WIDTH = 224;

function Sidebar() {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { user } = useAuth0();

  return (
    <Drawer
      sx={{
        width: `${SIDE_BAR_WIDTH}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${SIDE_BAR_WIDTH}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          border: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {currentUser && currentUser.organization && (
        <Box
          sx={{
            padding: (theme) => `${theme.spacing(1.5)} ${theme.spacing(0.5)}`,
          }}
        >
          <CurrentOrganization organization={currentUser.organization} />
        </Box>
      )}
      <Box
        sx={{
          padding: (theme) => theme.spacing(1.5),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          color="secondary"
          onClick={() => navigate(routes.teamGoals.path)}
        >
          {formatMessage({
            id: "sidebar.team-goals.new-team-goal-button-label",
          })}
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: (theme) =>
            `${theme.spacing(1.5)} 0 theme.spacing(1.5) theme.spacing(1.5)`,
        }}
      >
        <MenuList>
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.links.dashboard" })}
            icon={<HomeIcon />}
            route={routes.home}
          />
        </MenuList>
      </Box>
      <Box
        sx={{
          padding: (theme) =>
            `${theme.spacing(1.5)} 0 theme.spacing(1.5) theme.spacing(1.5)`,
        }}
      >
        <MenuList>
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.links.organization" })}
            icon={<SettingsIcon />}
            route={routes.organization}
          />
        </MenuList>
      </Box>
      <Box
        sx={{
          padding: (theme) => theme.spacing(1.5),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          startIcon={<PersonAddIcon />}
          color="secondary"
          onClick={() => navigate(routes.organization.path)}
        >
          {formatMessage({ id: "sidebar.invite.invite-people-button-label" })}
        </Button>
      </Box>
      {user && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(1.5),
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CurrentUser />
        </Box>
      )}
    </Drawer>
  );
}

export default Sidebar;

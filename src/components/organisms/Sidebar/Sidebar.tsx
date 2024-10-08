import React from "react";
import { Box, Drawer, MenuList } from "@mui/material";
import CurrentOrganization from "components/molecules/CurrentOrganization/CurrentOrganization";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import { useIntl } from "react-intl";
import Button from "components/atoms/Button/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useCurrentUser } from "hooks/useCurrentUser";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "hooks/useNavigate";

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
          flex: 1,
          padding: (theme) => theme.spacing(1.5),
        }}
      >
        <MenuList>
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.links.key-indicators" })}
            icon={<BarChartIcon />}
            to="home"
          />
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.links.improvement" })}
            icon={<TrendingUpIcon />}
            to="teamGoalsLibrary"
            sx={{ marginTop: (theme) => theme.spacing(1) }}
          />
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.links.team-goals" })}
            icon={<GroupsIcon />}
            to="teamGoals"
            sx={{ marginTop: (theme) => theme.spacing(1) }}
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
            to="organization"
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
          onClick={() => navigate("organization")}
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

import React from "react";
import { Box, Drawer, MenuList } from "@mui/material";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import CurrentOrganization from "components/molecules/CurrentOrganization/CurrentOrganization";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import HomeIcon from "@mui/icons-material/Home";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import routes from "routing";

export const SIDE_BAR_WIDTH = 224;

function Sidebar() {
  const { data: currentUserData } = useGetCurrentUserQuery();
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
      {currentUserData &&
        currentUserData.user &&
        currentUserData.user.organization && (
          <Box
            sx={{
              padding: (theme) => `${theme.spacing(2.5)} ${theme.spacing(1.5)}`,
            }}
          >
            <CurrentOrganization
              organization={currentUserData.user.organization}
            />
          </Box>
        )}
      <Box
        sx={{
          flex: 1,
          padding: (theme) =>
            `${theme.spacing(1.5)} 0 theme.spacing(1.5) theme.spacing(1.5)`,
        }}
      >
        <MenuList>
          <SidebarNavLink
            label="Home"
            icon={<HomeIcon />}
            route={routes.home}
          />
        </MenuList>
      </Box>
      {user && (
        <Box sx={{ padding: (theme) => theme.spacing(1.5) }}>
          <CurrentUser />
        </Box>
      )}
    </Drawer>
  );
}

export function withSidebar<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    return (
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <WrappedComponent {...props} />
        </Box>
      </Box>
    );
  };
}

export default Sidebar;

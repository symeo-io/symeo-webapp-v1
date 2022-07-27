import React, { useMemo } from "react";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { Route } from "routing";
import { useLocation, useNavigate } from "react-router-dom";

export type SidebarNavLinkProps = {
  label: string;
  icon: React.ReactElement;
  route: Route;
  sx?: MenuItemProps["sx"];
};

function SidebarNavLink({ label, icon, route, sx }: SidebarNavLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const selected = useMemo(
    () => location.pathname === route.path,
    [location, route]
  );

  return (
    <MenuItem
      sx={{ ...sx }}
      onClick={() => navigate(route.path)}
      selected={selected}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}

export default SidebarNavLink;

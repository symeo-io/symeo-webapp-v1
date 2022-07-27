import React, { useMemo } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Route } from "routing";
import { useLocation, useNavigate } from "react-router-dom";
import { PropsWithSx } from "types/PropsWithSx";

export type SidebarNavLinkProps = PropsWithSx & {
  label: string;
  icon: React.ReactElement;
  route: Route;
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

import React, { useMemo } from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { colors } from "theme/colors";
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
      sx={{
        position: "relative",
        "&:hover .selected-indicator": {
          background: colors.primary.shapeActive,
        },
        ...sx,
      }}
      onClick={() => navigate(route.path)}
      selected={selected}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
      {selected && (
        <Box
          className="selected-indicator"
          sx={{
            width: "2px",
            background: colors.primary.main,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </MenuItem>
  );
}

export default SidebarNavLink;

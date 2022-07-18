import React, { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button, { ButtonProps } from "components/atoms/Button/Button";

export type LoginButtonProps = { sx?: ButtonProps["sx"] };

function LoginButton({ sx }: LoginButtonProps) {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleClick = useCallback(() => {
    if (isAuthenticated) {
      return logout({ returnTo: window.location.origin });
    }

    return loginWithRedirect();
  }, [isAuthenticated, loginWithRedirect, logout]);

  return (
    <Button
      sx={sx}
      onClick={handleClick}
      disabled={isLoading}
      variant="contained"
    >
      {isLoading && "Loading..."}
      {!isLoading && isAuthenticated && "Log out"}
      {!isLoading && !isAuthenticated && "Log in"}
    </Button>
  );
}

export default LoginButton;

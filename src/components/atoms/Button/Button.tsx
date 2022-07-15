import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export type ButtonProps = MuiButtonProps;

function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}

export default Button;

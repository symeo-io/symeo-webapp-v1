import { Box, Radio, Typography } from "@mui/material";
import TextField from "components/molecules/TextField/TextField";
import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { ReleaseDetectionStrategy } from "components/organisms/OrganizationAdvancedSettings/OrganizationAdvancedSettings";

export type RadioWithTextFieldProps = PropsWithSx & {
  checked: boolean;
  radioValue: ReleaseDetectionStrategy;
  onSelect: (value: ReleaseDetectionStrategy) => void;
  title: string;
  message: string;
  fieldValue: string;
  setFieldValue: (value: string) => void;
};

function RadioWithTextField({
  checked,
  radioValue,
  onSelect,
  title,
  message,
  fieldValue,
  setFieldValue,
  sx,
}: RadioWithTextFieldProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", ...sx }}>
      <Radio
        checked={checked}
        onChange={(event) =>
          onSelect(event.target.value as ReleaseDetectionStrategy)
        }
        value={radioValue}
      />
      <Box sx={{ flex: 1 }}>
        <Box onClick={() => onSelect(radioValue)} sx={{ cursor: "pointer" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, lineHeight: "42px" }}
          >
            {title}
          </Typography>
          <Typography variant="body1">{message}</Typography>
        </Box>
        <TextField
          fullWidth
          disabled={!checked}
          value={fieldValue}
          onChange={(event) => setFieldValue(event.target.value)}
        />
      </Box>
    </Box>
  );
}

export default RadioWithTextField;

import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import LinearProgressWithLabel from "components/atoms/LinearProgressWithLabel/LinearProgressWithLabel";
import { PropsWithSx } from "types/PropsWithSx";

export type InitialProcessingLoaderProps = PropsWithSx & {
  value?: number;
};

function InitialProcessingLoader({ value }: InitialProcessingLoaderProps) {
  const { formatMessage } = useIntl();

  return (
    <Box>
      <Typography
        variant="body1"
        color="secondary"
        sx={{
          marginTop: (theme) => theme.spacing(4),
          textAlign: "center",
        }}
      >
        {formatMessage({ id: "data-status.loading" })}
      </Typography>
      {value !== undefined && (
        <LinearProgressWithLabel
          variant="determinate"
          value={value * 100}
          sx={{ marginTop: (theme) => theme.spacing(1) }}
        />
      )}
    </Box>
  );
}

export default InitialProcessingLoader;

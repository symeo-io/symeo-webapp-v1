import dayjs from "dayjs";
import { PropsWithSx } from "types/PropsWithSx";
import MessageBox from "components/atoms/MessageBox/MessageBox";
import { colors } from "theme/colors";
import UpdateIcon from "@mui/icons-material/Update";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDataStatus } from "hooks/useDataStatus";
import { useIntl } from "react-intl";

export type DataStatusProps = PropsWithSx;

function DataStatus({ sx }: DataStatusProps) {
  const { formatMessage } = useIntl();
  const { lastUpdateDate, isProcessingInitialJob } = useDataStatus();

  return (
    <MessageBox
      sx={{
        border: `1px solid ${colors.secondary.borders}`,
        paddingX: (theme) => theme.spacing(1.5),
        paddingY: (theme) => theme.spacing(1),

        "& .MuiSvgIcon-root": {
          animation: isProcessingInitialJob
            ? "spin 1.5s linear infinite"
            : undefined,

          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        },
        ...sx,
      }}
      message={
        isProcessingInitialJob
          ? formatMessage({ id: "data-status.initial-data-processing" })
          : formatMessage(
              { id: "data-status.last-update" },
              { date: dayjs(lastUpdateDate).format("MMM D, HH:mm") }
            )
      }
      variant="secondary"
      Icon={isProcessingInitialJob ? RefreshIcon : UpdateIcon}
    />
  );
}

export default DataStatus;

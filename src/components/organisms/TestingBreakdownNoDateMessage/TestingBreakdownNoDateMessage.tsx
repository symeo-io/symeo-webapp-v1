import { Link } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useCallback, useState } from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import MessageBox from "components/atoms/MessageBox/MessageBox";
import { useIntl } from "react-intl";
import TestingBreakdownConfigurationDialog from "components/organisms/TestingBreakdownConfigurationDialog/TestingBreakdownConfigurationDialog";

export type TestingBreakdownNoDataMessageProps = PropsWithSx;

function TestingBreakdownNoDataMessage({
  sx,
}: TestingBreakdownNoDataMessageProps) {
  const { formatMessage } = useIntl();
  const [documentationOpen, setDocumentationOpen] = useState<boolean>(false);

  const openDocumentation = useCallback(() => setDocumentationOpen(true), []);
  const closeDocumentation = useCallback(() => setDocumentationOpen(false), []);

  return (
    <>
      <MessageBox
        variant="warning"
        Icon={WarningRoundedIcon}
        message={
          <>
            {formatMessage({
              id: "testing.no-data-message",
            })}{" "}
            <Link onClick={openDocumentation} sx={{ cursor: "pointer" }}>
              {formatMessage({
                id: "testing.configure-link-label",
              })}
            </Link>{" "}
            {formatMessage({
              id: "testing.configure-message",
            })}
          </>
        }
        sx={sx}
      />
      <TestingBreakdownConfigurationDialog
        open={documentationOpen}
        handleClose={closeDocumentation}
      />
    </>
  );
}

export default TestingBreakdownNoDataMessage;

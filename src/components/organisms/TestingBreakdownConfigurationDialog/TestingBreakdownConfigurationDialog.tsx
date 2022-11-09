import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";

export type TestingBreakdownConfigurationDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
};

function TestingBreakdownConfigurationDialog({
  open,
  handleClose,
  sx,
}: TestingBreakdownConfigurationDialogProps) {
  const { formatMessage } = useIntl();

  const codeLines = [
    "curl -o- https://sh.symeo.io/testing.sh | bash -s -- \\",
    // eslint-disable-next-line no-template-curly-in-string
    "--api-key ${SYMEO_API_KEY} \\",
    "--coverage-report-path coverage/target/site/jacoco-aggregate/jacoco.xml \\",
    "--coverage-report-type jacoco \\",
    '--unit-test-file-pattern "./**/src/test/java/**/*Test.java" \\',
    '--integration-test-file-pattern "./**/src/test/java/**/*IT.java" \\',
    '--code-file-pattern "./**/src/main/java/**/*.java" \\',
    "--test-framework jUnit \\",
    // eslint-disable-next-line no-template-curly-in-string
    "--repository-name ${PROJECT_REPONAME} \\",
    // eslint-disable-next-line no-template-curly-in-string
    "--branch-name ${BRANCH_NAME} \\",
    // eslint-disable-next-line no-template-curly-in-string
    "--commit-sha ${COMMIT_SHA1}",
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiPaper-root": { maxWidth: "unset" }, ...sx }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <SettingsIcon sx={{ marginRight: (theme) => theme.spacing(1) }} />
        {formatMessage({
          id: "testing.configuration.title",
        })}
      </DialogTitle>
      <DialogContent sx={{ maxWidth: "770px" }}>
        <Box>
          <Typography variant="body2">
            {formatMessage({
              id: "testing.configuration.message",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2),
            padding: (theme) => theme.spacing(2),
            borderRadius: "8px",
            backgroundColor: colors.secondary.surface,
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
          }}
        >
          {codeLines.map((content, index) => (
            <Box
              sx={{ marginLeft: index !== 0 ? (theme) => theme.spacing(3) : 0 }}
            >
              {content}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2),
          }}
        >
          <Typography variant="body2">
            {formatMessage({
              id: "testing.configuration.with",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            "& .parameter": {
              marginBottom: (theme) => theme.spacing(2),
            },
            "& .code": {
              padding: "1px",
              borderRadius: "3px",
              backgroundColor: colors.secondary.surface,
              fontFamily:
                "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            },
          }}
        >
          <Box className="parameter">
            <span className="code">--api-key</span>:{" "}
            {formatMessage({ id: "testing.configuration.parameters.api-key" })}
          </Box>
          <Box className="parameter">
            <span className="code">--coverage-report-path</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.coverage-report-path",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--coverage-report-type</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.coverage-report-type",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--unit-test-file-pattern</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.unit-test-file-pattern",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--integration-test-file-pattern</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.integration-test-file-pattern",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--code-file-pattern</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.code-file-pattern",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--test-framework</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.test-framework",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--repository-name</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.repository-name",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--branch-name</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.branch-name",
            })}
          </Box>
          <Box className="parameter">
            <span className="code">--commit-sha</span>:{" "}
            {formatMessage({
              id: "testing.configuration.parameters.commit-sha",
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {formatMessage({ id: "confirm.close" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TestingBreakdownConfigurationDialog;

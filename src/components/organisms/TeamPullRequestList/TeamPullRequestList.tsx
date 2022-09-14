import {
  Box,
  Card,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useMemo, useState } from "react";
import { useGetPullRequestsQuery } from "redux/api/pull-requests/pull-requests.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";
import { useDataStatus } from "hooks/useDataStatus";
import { PullRequest } from "redux/api/pull-requests/pull-requests.types";
import { IntlShape, useIntl } from "react-intl";

const COLUMNS = {
  vcs_repository: {
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`vcs_repository:${pullRequest.id}`}>
        {pullRequest.vcs_repository}
      </TableCell>
    ),
  },
  title: {
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`title:${pullRequest.id}`}>
        <Link href={pullRequest.vcs_url} target="_blank">
          {pullRequest.title}
        </Link>
      </TableCell>
    ),
  },
  author: {
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`author:${pullRequest.id}`}>
        {pullRequest.author}
      </TableCell>
    ),
  },
  commit_number: {
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`commit_number:${pullRequest.id}`}>
        {pullRequest.commit_number}
      </TableCell>
    ),
  },
  size: {
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`size:${pullRequest.id}`}>{pullRequest.size}</TableCell>
    ),
  },
  days_opened: {
    renderCell: (
      pullRequest: PullRequest,
      formatMessage: IntlShape["formatMessage"]
    ) => (
      <TableCell key={`days_opened:${pullRequest.id}`}>
        {formatMessage(
          {
            id: "pull-requests-table.days-to-merge-value",
          },
          { value: pullRequest.days_opened }
        )}
      </TableCell>
    ),
  },
};

export type PullRequestColumnName = keyof typeof COLUMNS;

export type TeamPullRequestListProps = PropsWithSx & {
  columns?: PullRequestColumnName[];
};

function TeamPullRequestList({ columns, sx }: TeamPullRequestListProps) {
  const { formatMessage } = useIntl();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("vcs_repository");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageSize] = useState<number>(5);
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const displayedColumns = useMemo(
    () => columns ?? (Object.keys(COLUMNS) as PullRequestColumnName[]),
    [columns]
  );

  const { data, isLoading } = useGetPullRequestsQuery(
    {
      teamId: selectedTeam?.id as string,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
      pageIndex,
      pageSize,
      sortBy,
      sortDirection,
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  );

  const pullRequests: PullRequest[] = useMemo(
    () => data?.pull_requests_page.pull_requests ?? [],
    [data]
  );

  const itemsCount: number = useMemo(
    () => data?.pull_requests_page.total_item_number ?? 0,
    [data]
  );

  const createSortHandler = (property: string) => () => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => theme.spacing(2),
        overflow: "visible",
        ...sx,
      }}
    >
      <Typography
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
        variant="h2"
      >
        {formatMessage({
          id: "pull-requests-table.title",
        })}
      </Typography>
      {(isProcessingInitialJob || isLoading) && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          {isProcessingInitialJob && (
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
          )}
        </Box>
      )}

      {!isProcessingInitialJob && !isLoading && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {displayedColumns.map((columnKey) => (
                  <TableCell
                    key={columnKey}
                    sortDirection={sortBy === columnKey ? sortDirection : false}
                  >
                    <TableSortLabel
                      active={sortBy === columnKey}
                      direction={sortBy === columnKey ? sortDirection : "asc"}
                      onClick={createSortHandler(columnKey)}
                    >
                      {formatMessage({
                        id: `pull-requests-table.columns.${columnKey}`,
                      })}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pullRequests.map((pullRequest) => (
                <TableRow key={pullRequest.id}>
                  {displayedColumns.map((columnKey) =>
                    COLUMNS[columnKey].renderCell(pullRequest, formatMessage)
                  )}
                </TableRow>
              ))}
              {pullRequests.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={displayedColumns.length}
                    sx={{ textAlign: "center" }}
                  >
                    <Typography variant="body2">
                      {formatMessage({
                        id: `pull-requests-table.empty-message`,
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={itemsCount}
                  onPageChange={(_, page) => setPageIndex(page)}
                  page={pageIndex}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={[]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
}

export default TeamPullRequestList;

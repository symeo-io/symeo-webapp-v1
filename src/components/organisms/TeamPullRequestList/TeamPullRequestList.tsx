import {
  Card,
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

export type TeamPullRequestListProps = PropsWithSx;

const COLUMNS = [
  {
    key: "vcs_repository",
    renderCell: (pullRequest: PullRequest) => (
      <TableCell>{pullRequest.vcs_repository}</TableCell>
    ),
  },
  {
    key: "title",
    renderCell: (pullRequest: PullRequest) => (
      <TableCell>
        <Link href={pullRequest.vcs_url} target="_blank">
          {pullRequest.title}
        </Link>
      </TableCell>
    ),
  },
  {
    key: "author",
    renderCell: (pullRequest: PullRequest) => (
      <TableCell>{pullRequest.author}</TableCell>
    ),
  },
  {
    key: "commit_number",
    renderCell: (pullRequest: PullRequest) => (
      <TableCell>{pullRequest.commit_number}</TableCell>
    ),
  },
  {
    key: "size",
    renderCell: (pullRequest: PullRequest) => (
      <TableCell>{pullRequest.size}</TableCell>
    ),
  },
  {
    key: "days_opened",
    renderCell: (
      pullRequest: PullRequest,
      formatMessage: IntlShape["formatMessage"]
    ) => (
      <TableCell>
        {formatMessage(
          {
            id: "pull-requests-table.days-to-merge-value",
          },
          { value: pullRequest.days_opened }
        )}
      </TableCell>
    ),
  },
];

function TeamPullRequestList({ sx }: TeamPullRequestListProps) {
  const { formatMessage } = useIntl();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("vcs_repository");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageSize] = useState<number>(5);
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const { data } = useGetPullRequestsQuery(
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  sortDirection={sortBy === column.key ? sortDirection : false}
                >
                  <TableSortLabel
                    active={sortBy === column.key}
                    direction={sortBy === column.key ? sortDirection : "asc"}
                    onClick={createSortHandler(column.key)}
                  >
                    {formatMessage({
                      id: `pull-requests-table.columns.${column.key}`,
                    })}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pullRequests.map((pullRequest) => (
              <TableRow key={pullRequest.id}>
                {COLUMNS.map((column) =>
                  column.renderCell(pullRequest, formatMessage)
                )}
              </TableRow>
            ))}
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
    </Card>
  );
}

export default TeamPullRequestList;

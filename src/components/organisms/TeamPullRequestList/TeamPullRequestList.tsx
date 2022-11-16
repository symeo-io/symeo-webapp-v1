import { Link, TableCell } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useMemo, useState } from "react";
import { useGetPullRequestsQuery } from "redux/api/pull-requests/pull-requests.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";
import { useDataStatus } from "hooks/useDataStatus";
import { PullRequest } from "redux/api/pull-requests/pull-requests.types";
import { useIntl } from "react-intl";
import PaginatedTable from "components/molecules/PaginatedTable/PaginatedTable";
import { intl } from "intl";

const COLUMNS = [
  {
    key: "vcs_repository",
    label: intl.formatMessage({
      id: `pull-requests-table.columns.vcs_repository`,
    }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`vcs_repository:${pullRequest.id}`}>
        {pullRequest.vcs_repository}
      </TableCell>
    ),
  },
  {
    key: "title",
    label: intl.formatMessage({ id: `pull-requests-table.columns.title` }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`title:${pullRequest.id}`}>
        <Link href={pullRequest.vcs_url} target="_blank">
          {pullRequest.title}
        </Link>
      </TableCell>
    ),
  },
  {
    key: "author",
    label: intl.formatMessage({ id: `pull-requests-table.columns.author` }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`author:${pullRequest.id}`}>
        {pullRequest.author}
      </TableCell>
    ),
  },
  {
    key: "commit_number",
    label: intl.formatMessage({
      id: `pull-requests-table.columns.commit_number`,
    }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`commit_number:${pullRequest.id}`}>
        {pullRequest.commit_number}
      </TableCell>
    ),
  },
  {
    key: "size",
    label: intl.formatMessage({ id: `pull-requests-table.columns.size` }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`size:${pullRequest.id}`}>{pullRequest.size}</TableCell>
    ),
  },
  {
    key: "days_opened",
    label: intl.formatMessage({
      id: `pull-requests-table.columns.days_opened`,
    }),
    renderCell: (pullRequest: PullRequest) => (
      <TableCell key={`days_opened:${pullRequest.id}`}>
        {intl.formatMessage(
          {
            id: "pull-requests-table.days-to-merge-value",
          },
          { value: pullRequest.days_opened }
        )}
      </TableCell>
    ),
  },
];

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

  return (
    <PaginatedTable<PullRequest>
      sx={sx}
      title={formatMessage({
        id: "pull-requests-table.title",
      })}
      data={pullRequests}
      columns={COLUMNS}
      totalItemCount={itemsCount}
      isLoading={isLoading}
      emptyMessage={formatMessage({
        id: `pull-requests-table.empty-message`,
      })}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPageIndex={setPageIndex}
      sortBy={sortBy}
      sortDirection={sortDirection}
      setSortBy={setSortBy}
      setSortDirection={setSortDirection}
    />
  );
}

export default TeamPullRequestList;

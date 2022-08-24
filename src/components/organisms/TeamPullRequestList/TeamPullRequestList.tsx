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
import { useIntl } from "react-intl";

export type TeamPullRequestListProps = PropsWithSx;

function TeamPullRequestList({ sx }: TeamPullRequestListProps) {
  const { formatMessage } = useIntl();
  const [pageIndex, setPageIndex] = useState<number>(0);
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
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.repository",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.name",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.author",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.commits",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.size",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "pull-requests-table.columns.days-to-merge",
                })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pullRequests.map((pullRequest) => (
              <TableRow key={pullRequest.id}>
                <TableCell>{pullRequest.vcs_repository}</TableCell>
                <TableCell>
                  <Link href={pullRequest.vcs_url} target="_blank">
                    {pullRequest.title}
                  </Link>
                </TableCell>
                <TableCell>{pullRequest.author}</TableCell>
                <TableCell>{pullRequest.commit_number}</TableCell>
                <TableCell>{pullRequest.size}</TableCell>
                <TableCell>
                  {formatMessage(
                    {
                      id: "pull-requests-table.days-to-merge-value",
                    },
                    { value: pullRequest.days_opened }
                  )}
                </TableCell>
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

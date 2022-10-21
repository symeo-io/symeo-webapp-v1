import { Link, TableCell } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useMemo, useState } from "react";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";
import { useDataStatus } from "hooks/useDataStatus";
import { useIntl } from "react-intl";
import PaginatedTable from "components/molecules/PaginatedTable/PaginatedTable";
import { intl } from "intl";
import { useGetCycleTimePiecesQuery } from "redux/api/cycle-time/cycle-time.api";
import { CycleTimePiece } from "redux/api/cycle-time/cycle-time.types";
import { DurationService } from "services/time/DurationService";

const COLUMNS = [
  {
    key: "vcs_repository",
    label: intl.formatMessage({
      id: `cycle-time-piece-table.columns.vcs_repository`,
    }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`vcs_repository:${piece.id}`}>
        {piece.vcs_repository}
      </TableCell>
    ),
  },
  {
    key: "title",
    label: intl.formatMessage({ id: `cycle-time-piece-table.columns.title` }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`title:${piece.id}`}>
        <Link href={piece.vcs_url} target="_blank">
          {piece.title}
        </Link>
      </TableCell>
    ),
  },
  {
    key: "author",
    label: intl.formatMessage({ id: `cycle-time-piece-table.columns.author` }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`author:${piece.id}`}>{piece.author}</TableCell>
    ),
  },
  {
    key: "cycle_time",
    label: intl.formatMessage({
      id: `cycle-time-piece-table.columns.cycle_time`,
    }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`cycle_time:${piece.id}`}>
        {DurationService.minutesToDisplayString(piece.cycle_time)}
      </TableCell>
    ),
  },
  {
    key: "coding_time",
    label: intl.formatMessage({
      id: `cycle-time-piece-table.columns.coding_time`,
    }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`coding_time:${piece.id}`}>
        {DurationService.minutesToDisplayString(piece.coding_time)}
      </TableCell>
    ),
  },
  {
    key: "review_time",
    label: intl.formatMessage({
      id: `cycle-time-piece-table.columns.review_time`,
    }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`review_time:${piece.id}`}>
        {DurationService.minutesToDisplayString(piece.review_time)}
      </TableCell>
    ),
  },
  {
    key: "time_to_deploy",
    label: intl.formatMessage({
      id: `cycle-time-piece-table.columns.time_to_deploy`,
    }),
    renderCell: (piece: CycleTimePiece) => (
      <TableCell key={`time_to_deploy:${piece.id}`}>
        {DurationService.minutesToDisplayString(piece.time_to_deploy)}
      </TableCell>
    ),
  },
];

export type CycleTimePiecesListProps = PropsWithSx;

function CycleTimePiecesList({ sx }: CycleTimePiecesListProps) {
  const { formatMessage } = useIntl();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("vcs_repository");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageSize] = useState<number>(5);
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const { data, isLoading } = useGetCycleTimePiecesQuery(
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

  const pieces: CycleTimePiece[] = useMemo(
    () => data?.pieces_page.pieces ?? [],
    [data]
  );

  const itemsCount: number = useMemo(
    () => data?.pieces_page.total_item_number ?? 0,
    [data]
  );

  return (
    <PaginatedTable<CycleTimePiece>
      sx={sx}
      title={formatMessage({
        id: "cycle-time-piece-table.title",
      })}
      data={pieces}
      columns={COLUMNS}
      totalItemCount={itemsCount}
      isLoading={isLoading}
      emptyMessage={formatMessage({
        id: `cycle-time-piece-table.empty-message`,
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

export default CycleTimePiecesList;

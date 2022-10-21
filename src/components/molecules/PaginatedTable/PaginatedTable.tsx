import React from "react";
import {
  Box,
  Card,
  CircularProgress,
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
import { useDataStatus } from "hooks/useDataStatus";
import InitialProcessingLoader from "components/molecules/InitialProcessingLoader/InitialProcessingLoader";

export type PaginatedTableColumnDefinition<T> = {
  key: string;
  label: string;
  renderCell: (data: T) => React.ReactNode;
};

export type PaginatedTableProps<T> = PropsWithSx & {
  title: string;
  data: T[];
  isLoading: boolean;
  columns: PaginatedTableColumnDefinition<T>[];
  totalItemCount: number;
  emptyMessage: string;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (value: "asc" | "desc") => void;
  pageSize: number;
};

function PaginatedTable<T extends { id: string }>({
  title,
  data,
  isLoading,
  columns,
  totalItemCount,
  emptyMessage,
  sortBy,
  sortDirection,
  setSortDirection,
  setSortBy,
  pageSize,
  pageIndex,
  setPageIndex,
  sx,
}: PaginatedTableProps<T>) {
  const { isProcessingInitialJob, currentProgression } = useDataStatus();

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
        {title}
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
            <InitialProcessingLoader value={currentProgression} />
          )}
        </Box>
      )}

      {!isProcessingInitialJob && !isLoading && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sortDirection={
                      sortBy === column.key ? sortDirection : false
                    }
                  >
                    <TableSortLabel
                      active={sortBy === column.key}
                      direction={sortBy === column.key ? sortDirection : "asc"}
                      onClick={createSortHandler(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => column.renderCell(row))}
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{ textAlign: "center" }}
                  >
                    <Typography variant="body2">{emptyMessage}</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalItemCount}
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

export default PaginatedTable;

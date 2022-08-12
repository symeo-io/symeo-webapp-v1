import * as React from "react";
import { useCallback, useContext, useMemo } from "react";
import { SelectedDateRangeContext } from "providers/selectedDateRange/SelectedDateRangeContextProvider";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { staticRanges } from "components/molecules/DateRangeSelector/utils";
import { Box, Popover, Typography } from "@mui/material";
import { colors } from "theme/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dayjs from "dayjs";

const RANGE_KEY = "SELECTED_DATE_RANGE";

function DateRangeSelector() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  const { dateRange, setDateRange } = useContext(SelectedDateRangeContext);

  const selectionRange = useMemo(
    () => ({
      startDate: dateRange[0],
      endDate: dateRange[1],
      key: RANGE_KEY,
    }),
    [dateRange]
  );

  const onChange = useCallback(
    (ranges: RangeKeyDict) => {
      const range = ranges[RANGE_KEY];
      setDateRange([range.startDate, range.endDate]);
    },
    [setDateRange]
  );

  const ArrowIcon = open ? ExpandLessIcon : ExpandMoreIcon;

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
          background: "white",
          padding: "10px 16px",
          borderRadius: "4px",
          border: `1px solid ${colors.secondary.borders}`,
          userSelect: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",

          "&:after": {
            position: "absolute",
            content: '""',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: "4px",
            outline: `2px solid ${colors.primary.main}`,
            opacity: open ? 1 : 0,
            transition: "opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          },
        }}
      >
        <CalendarMonthIcon
          sx={{
            marginRight: (theme) => theme.spacing(1),
            color: "rgba(0, 0, 0, 0.54)",
            fontSize: "1rem",
          }}
        />
        <Typography component="span" sx={{ fontWeight: 700 }}>
          {dayjs(dateRange[0]).format("MMM D")}
          {" - "}
          {dayjs(dateRange[1]).format("MMM D")}
        </Typography>
        <ArrowIcon
          sx={{
            marginLeft: (theme) => theme.spacing(1),
            color: "rgba(0, 0, 0, 0.54)",
            fontSize: "1rem",
          }}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: { marginTop: (theme) => theme.spacing(1) },
        }}
      >
        <Box
          sx={{
            "& .rdrStaticRange": {
              fontFamily: "Roboto",
            },
            ".rdrDayToday .rdrDayNumber span:after": {
              background: colors.primary.main,
            },
          }}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={onChange}
            showDateDisplay={false}
            showPreview={false}
            months={2}
            direction="horizontal"
            moveRangeOnFirstSelection={false}
            inputRanges={[]}
            staticRanges={staticRanges}
            editableDateInputs={false}
            color={colors.primary.main}
            rangeColors={[colors.primary.main as string]}
          />
        </Box>
      </Popover>
    </>
  );
}

export default DateRangeSelector;

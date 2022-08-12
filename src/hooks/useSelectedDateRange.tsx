import { useLocalStorage } from "hooks/useLocalStorage";
import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { dates } from "components/molecules/DateRangeSelector/utils";

const SELECTED_START_DATE_STORAGE_KEY = "SELECTED_START_DATE";
const SELECTED_END_DATE_STORAGE_KEY = "SELECTED_END_DATE";

const DATE_STORAGE_FORMAT = "YYYY-MM-DD";

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export const useSelectedDateRange = (): [
  DateRange,
  (value: DateRange) => void
] => {
  const [startDate, setStartDate] = useLocalStorage(
    SELECTED_START_DATE_STORAGE_KEY
  );
  const [endDate, setEndDate] = useLocalStorage(SELECTED_END_DATE_STORAGE_KEY);

  const dateRange: DateRange = useMemo(
    () => ({
      startDate: startDate
        ? dayjs(startDate, DATE_STORAGE_FORMAT).toDate()
        : dates.startOfLastTwoWeeks.toDate(),
      endDate: endDate
        ? dayjs(endDate, DATE_STORAGE_FORMAT).toDate()
        : dates.today.toDate(),
    }),
    [startDate, endDate]
  );

  const setDateRange = useCallback(
    ({ startDate, endDate }: DateRange) => {
      setStartDate(dayjs(startDate).format(DATE_STORAGE_FORMAT));
      setEndDate(dayjs(endDate).format(DATE_STORAGE_FORMAT));
    },
    [setEndDate, setStartDate]
  );

  return [dateRange, setDateRange];
};

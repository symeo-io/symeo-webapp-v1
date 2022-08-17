import dayjs from "dayjs";
import { createStaticRanges } from "react-date-range";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

export const dates = {
  today: dayjs(),
  startOfLastTwoWeeks: dayjs().subtract(2, "weeks"),
  startOfLastFourWeeks: dayjs().subtract(4, "weeks"),
  startOfCurrentQuarter: dayjs().startOf("quarter"),
  startOfLastQuarter: dayjs().subtract(1, "quarter").startOf("quarter"),
  endOfLastQuarter: dayjs().subtract(1, "quarter").endOf("quarter"),
};

export const staticRanges = createStaticRanges([
  {
    label: "Last two weeks",
    range: () => {
      return {
        startDate: dates.startOfLastTwoWeeks.toDate(),
        endDate: dates.today.toDate(),
      };
    },
    isSelected: (range) => {
      return (
        dayjs(range.startDate).isSame(dates.startOfLastTwoWeeks, "day") &&
        dayjs(range.endDate).isSame(dates.today, "day")
      );
    },
  },
  {
    label: "Last four weeks",
    range: () => {
      return {
        startDate: dates.startOfLastFourWeeks.toDate(),
        endDate: dates.today.toDate(),
      };
    },
    isSelected: (range) => {
      return (
        dayjs(range.startDate).isSame(dates.startOfLastFourWeeks, "day") &&
        dayjs(range.endDate).isSame(dates.today, "day")
      );
    },
  },
  {
    label: "Current quarter",
    range: () => {
      return {
        startDate: dates.startOfCurrentQuarter.toDate(),
        endDate: dates.today.toDate(),
      };
    },
    isSelected: (range) => {
      return (
        dayjs(range.startDate).isSame(dates.startOfCurrentQuarter, "day") &&
        dayjs(range.endDate).isSame(dates.today, "day")
      );
    },
  },
  {
    label: "Last quarter",
    range: () => {
      return {
        startDate: dates.startOfLastQuarter.toDate(),
        endDate: dates.endOfLastQuarter.toDate(),
      };
    },
    isSelected: (range) => {
      return (
        dayjs(range.startDate).isSame(dates.startOfLastQuarter, "day") &&
        dayjs(range.endDate).isSame(dates.endOfLastQuarter, "day")
      );
    },
  },
]);

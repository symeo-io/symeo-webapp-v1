import React, { PropsWithChildren } from "react";
import { dates } from "components/molecules/DateRangeSelector/utils";

export const SelectedDateRangeContext = React.createContext<{
  dateRange: [Date | undefined, Date | undefined];
  setDateRange: (value: [Date | undefined, Date | undefined]) => void;
}>({
  dateRange: [new Date(), new Date()],
  setDateRange: () => {},
});

export const SelectedDateRangeContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [dateRange, setDateRange] = React.useState<
    [Date | undefined, Date | undefined]
  >([dates.startOfLastTwoWeeks.toDate(), dates.today.toDate()]);

  return (
    <SelectedDateRangeContext.Provider
      value={{
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </SelectedDateRangeContext.Provider>
  );
};

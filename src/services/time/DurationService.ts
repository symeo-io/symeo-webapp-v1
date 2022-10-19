import { intl } from "intl";

export type DurationUnit = "minutes" | "hours" | "days";

export class DurationService {
  private static minutesToDays(value: number) {
    return value / 60 / 24;
  }

  private static minutesToHours(value: number) {
    return value / 60;
  }

  public static minutesToDisplayValueAndUnit(
    value: number | undefined | null
  ): {
    value: number | null;
    unit: DurationUnit | null;
  } {
    if (value === undefined || value === null) {
      return {
        value: null,
        unit: null,
      };
    }

    if (value < 60) {
      return {
        value,
        unit: "minutes",
      };
    } else if (value < 60 * 24) {
      return {
        value: DurationService.minutesToHours(value),
        unit: "hours",
      };
    } else {
      return {
        value: DurationService.minutesToDays(value),
        unit: "days",
      };
    }
  }

  public static minutesToDisplayString(
    value: number | undefined | null
  ): string {
    const convertedValueAndUnit =
      DurationService.minutesToDisplayValueAndUnit(value);

    if (convertedValueAndUnit.value === null) {
      return intl.formatMessage({ id: "time.unknown" });
    }

    return intl.formatMessage(
      { id: `time.value-${convertedValueAndUnit.unit}` },
      {
        value: convertedValueAndUnit.value,
      }
    );
  }
}

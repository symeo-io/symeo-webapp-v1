import { colors } from "theme/colors";

export type CycleTimeColor = "green" | "orange" | "red";

export class CycleTimeColorService {
  public static breakdownColorsLimits = {
    coding_time: {
      green: 24 * 60, // 1 day
      orange: 2 * 24 * 60, // 2 days
    },
    review_time: {
      green: 2 * 60, // 2 hour
      orange: 4 * 60, // 4 hour
    },
    time_to_deploy: {
      green: 7 * 24 * 60, // 7 days
      orange: 14 * 24 * 60, // 14 days
    },
  };

  public static buildColorFromValue(
    type: keyof typeof CycleTimeColorService.breakdownColorsLimits,
    value?: number
  ): CycleTimeColor {
    const limits = CycleTimeColorService.breakdownColorsLimits[type];

    if (!value) return "green";

    if (value <= limits.green) {
      return "green";
    }
    if (value <= limits.orange) {
      return "orange";
    }

    return "red";
  }

  public static buildBackgroundColorFromColor(color: CycleTimeColor) {
    switch (color) {
      case "green":
        return colors.success.main as string;
      case "orange":
        return colors.warning.main as string;
      case "red":
        return colors.error.main as string;
      default:
        return colors.success.main as string;
    }
  }

  public static buildBackgroundColorFromValue(
    type: keyof typeof CycleTimeColorService.breakdownColorsLimits,
    value?: number
  ) {
    const color = CycleTimeColorService.buildColorFromValue(type, value);
    return CycleTimeColorService.buildBackgroundColorFromColor(color);
  }
}

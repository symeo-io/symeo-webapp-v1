import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";

export const standards = standardsData.standards as Record<
  StandardCode,
  Standard
>;

import { ResponseWithErrors } from "redux/api/errors.type";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";

export type Goal = {
  id: string;
  current_value: number;
  standard_code: StandardCode;
  team_id: string;
  value: number;
};

export type GetGoalsInput = {
  teamId: string;
};

export type GetGoalsResponse = ResponseWithErrors & {
  team_goals: Goal[];
};

export type CreateGoalInput = {
  standard_code: StandardCode;
  team_id: string;
  value: number;
};

export type CreateGoalResponse = ResponseWithErrors;

export type DeleteGoalsInput = {
  teamGoalId: string;
};

export type DeleteGoalsResponse = ResponseWithErrors;

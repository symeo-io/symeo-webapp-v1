import { Error } from "../errors.type";

export type Organization = {
  id: string;
  name: string;
};

export type OnBoarding = {
  has_configured_team: boolean;
  has_connected_to_vcs: boolean;
};

export type User = {
  id: string;
  email: string;
  organization?: Organization;
  onboarding: OnBoarding;
};

export type CurrentUserResponse = {
  user: User;
  errors?: Error[];
};

export type UpdateOnBoardingResponse = {
  onboarding: OnBoarding;
  errors?: Error[];
};

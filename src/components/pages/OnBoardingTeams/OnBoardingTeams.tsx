import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useIntl } from "react-intl";
import {
  useGetCurrentUserQuery,
  useUpdateOnBoardingMutation,
} from "redux/api/users/users.api";
import routes from "routing";
import { useNavigate } from "react-router-dom";
import OnBoardingPageContainer from "components/molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "components/molecules/OnBoardingCard/OnBoardingCard";
import { CreateTeamFormValues } from "components/organisms/CreateTeamForm/CreateTeamForm";
import Button from "components/atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateTeamSection from "./CreateTeamSection";
import {
  emptyTeamFormErrors,
  FormErrors,
  getTeamsFormErrors,
  isErrorsListEmpty,
} from "components/organisms/CreateTeamForm/utils";
import cloneDeep from "lodash/cloneDeep";
import { useCreateTeamsMutation } from "redux/api/teams/teams.api";
import { formValuesToCreateTeamInput } from "redux/api/teams/teams.types";

const EMPTY_TEAM: CreateTeamFormValues = {
  name: "",
  repositories: [],
};

function OnBoardingTeams() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { data: currentUserData, isSuccess } = useGetCurrentUserQuery();
  const [createTeams, { isLoading: isLoadingCreateTeams }] =
    useCreateTeamsMutation();
  const [updateOnboarding, { isLoading: isLoadingUpdateOnBoarding }] =
    useUpdateOnBoardingMutation();

  const [teams, setTeams] = useState<CreateTeamFormValues[]>([
    { ...EMPTY_TEAM },
  ]);
  const [errors, setErrors] = useState<FormErrors<CreateTeamFormValues>[]>([
    cloneDeep(emptyTeamFormErrors),
  ]);

  const setTeam = useCallback(
    (index: number, values: CreateTeamFormValues) => {
      const newTeams = [...teams];
      newTeams[index] = values;
      setTeams(newTeams);
    },
    [teams]
  );

  const setTeamErrors = useCallback(
    (index: number, teamErrors: FormErrors<CreateTeamFormValues>) => {
      const newErrors = [...errors];
      newErrors[index] = teamErrors;
      setErrors(newErrors);
    },
    [errors]
  );

  const addTeam = useCallback(() => {
    setTeams([...teams, { ...EMPTY_TEAM }]);
    setErrors([...errors, cloneDeep(emptyTeamFormErrors)]);
  }, [errors, teams]);

  const removeTeam = useCallback(
    (index: number) => {
      if (teams.length > 1) {
        const newTeams = [...teams];
        newTeams.splice(index, 1);
        setTeams(newTeams);

        const newErrors = [...errors];
        newErrors.splice(index, 1);
        setErrors(newErrors);
      }
    },
    [errors, teams]
  );

  const handleNext = useCallback(async () => {
    const errors = getTeamsFormErrors(teams);
    setErrors(errors);

    if (isErrorsListEmpty(errors)) {
      await createTeams(formValuesToCreateTeamInput(teams));
      return navigate(routes.home.path);
    }
  }, [createTeams, navigate, teams]);

  const handleSkip = useCallback(async () => {
    await updateOnboarding({
      has_configured_team: true,
      has_connected_to_vcs: true,
    });
    return navigate(routes.home.path);
  }, [navigate, updateOnboarding]);

  useEffect(() => {
    if (
      isSuccess &&
      currentUserData &&
      currentUserData.user.onboarding.has_configured_team
    ) {
      navigate(routes.home.path);
    }
  }, [currentUserData, isSuccess, navigate]);

  return (
    <OnBoardingPageContainer>
      <OnBoardingCard
        title={formatMessage({
          id: "on-boarding.create-teams.title",
        })}
        subtitle={formatMessage({
          id: "on-boarding.create-teams.message",
        })}
      >
        <Box sx={{ width: "100%" }}>
          {teams.map((team, index) => (
            <CreateTeamSection
              key={index}
              index={index}
              errors={errors[index]}
              setErrors={setTeamErrors}
              team={team}
              setTeam={setTeam}
              teamsNumber={teams.length}
              onRemoveTeamClick={removeTeam}
            />
          ))}
          <Box
            sx={{
              textAlign: "center",
              marginTop: (theme) => theme.spacing(8),
            }}
          >
            <Button startIcon={<AddIcon />} onClick={addTeam}>
              {formatMessage({
                id: "on-boarding.create-teams.add-team-button-label",
              })}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: (theme) => theme.spacing(8),
            }}
          >
            <Button
              variant="outlined"
              loading={isLoadingUpdateOnBoarding}
              disabled={isLoadingCreateTeams}
              onClick={handleSkip}
            >
              {formatMessage({
                id: "on-boarding.create-teams.skip-button-label",
              })}
            </Button>
            <Button
              sx={{ marginLeft: (theme) => theme.spacing(2) }}
              loading={isLoadingCreateTeams}
              disabled={isLoadingUpdateOnBoarding}
              onClick={handleNext}
            >
              {formatMessage({
                id: "on-boarding.create-teams.next-button-label",
              })}
            </Button>
          </Box>
        </Box>
      </OnBoardingCard>
    </OnBoardingPageContainer>
  );
}

export default OnBoardingTeams;

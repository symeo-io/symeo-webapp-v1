import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useIntl } from "react-intl";
import OnBoardingPageContainer from "components/molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "components/molecules/OnBoardingCard/OnBoardingCard";
import { EditOrCreateTeamFormValues } from "components/organisms/CreateTeamForm/CreateTeamForm";
import Button from "components/atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateTeamSection from "./CreateTeamSection";
import {
  EMPTY_TEAM,
  EMPTY_TEAM_FORM_ERRORS,
  FormErrors,
  getTeamsFormErrors,
  isErrorsListEmpty,
} from "components/organisms/CreateTeamForm/utils";
import cloneDeep from "lodash/cloneDeep";
import { useCreateTeamsMutation } from "redux/api/teams/teams.api";
import { formValuesToCreateTeamInput } from "redux/api/teams/teams.types";
import { useNavigate } from "hooks/useNavigate";

function OnBoardingTeams() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [createTeams, { isLoading: isLoadingCreateTeams }] =
    useCreateTeamsMutation();

  const [teams, setTeams] = useState<EditOrCreateTeamFormValues[]>([
    cloneDeep(EMPTY_TEAM),
  ]);
  const [errors, setErrors] = useState<
    FormErrors<EditOrCreateTeamFormValues>[]
  >([cloneDeep(EMPTY_TEAM_FORM_ERRORS)]);

  const setTeam = useCallback(
    (index: number, values: EditOrCreateTeamFormValues) => {
      const newTeams = [...teams];
      newTeams[index] = values;
      setTeams(newTeams);
    },
    [teams]
  );

  const setTeamErrors = useCallback(
    (index: number, teamErrors: FormErrors<EditOrCreateTeamFormValues>) => {
      const newErrors = [...errors];
      newErrors[index] = teamErrors;
      setErrors(newErrors);
    },
    [errors]
  );

  const addTeam = useCallback(() => {
    setTeams([...teams, cloneDeep(EMPTY_TEAM)]);
    setErrors([...errors, cloneDeep(EMPTY_TEAM_FORM_ERRORS)]);
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
      return navigate("home");
    }
  }, [createTeams, navigate, teams]);

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
              sx={{ marginLeft: (theme) => theme.spacing(2) }}
              loading={isLoadingCreateTeams}
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

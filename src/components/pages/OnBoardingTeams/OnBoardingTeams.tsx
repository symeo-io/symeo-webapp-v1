import React, { useCallback, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetCurrentUserQuery } from "redux/api/user/user.api";
import routes from "routing";
import { useNavigate } from "react-router-dom";
import OnBoardingPageContainer from "components/molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "components/molecules/OnBoardingCard/OnBoardingCard";
import CreateTeamForm, {
  CreateTeamFormValues,
} from "components/organisms/CreateTeamForm/CreateTeamForm";
import Button from "components/atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

function OnBoardingTeams() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { data: currentUserData, isSuccess } = useGetCurrentUserQuery();

  const [teams, setTeams] = useState<CreateTeamFormValues[]>([
    {
      name: "",
      repositories: [],
    },
  ]);

  const setTeam = useCallback(
    (index: number, values: CreateTeamFormValues) => {
      const newTeams = [...teams];
      newTeams[index] = values;
      setTeams(newTeams);
    },
    [teams]
  );

  const addTeam = useCallback(
    () =>
      setTeams([
        ...teams,
        {
          name: "",
          repositories: [],
        },
      ]),
    [teams]
  );

  const removeTeam = useCallback(
    (index: number) => {
      if (teams.length > 1) {
        const newTeams = [...teams];
        newTeams.splice(index, 1);
        setTeams(newTeams);
      }
    },
    [teams]
  );

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
            <>
              {index !== 0 && (
                <Divider sx={{ marginTop: (theme) => theme.spacing(4) }} />
              )}
              <Box
                sx={{
                  padding: (theme) => theme.spacing(1),
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ClearIcon
                  onClick={() => removeTeam(index)}
                  sx={{
                    cursor: "pointer",
                    fontSize: "18px",
                    visibility: teams.length <= 1 ? "hidden" : undefined,
                  }}
                />
              </Box>
              <CreateTeamForm
                key={index}
                values={team}
                setValues={(values: CreateTeamFormValues) =>
                  setTeam(index, values)
                }
                sx={{
                  marginTop:
                    index !== 0 ? (theme) => theme.spacing(3) : undefined,
                }}
              />
            </>
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
            <Button variant="outlined">
              {formatMessage({
                id: "on-boarding.create-teams.skip-button-label",
              })}
            </Button>
            <Button sx={{ marginLeft: (theme) => theme.spacing(2) }}>
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

import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetCurrentUserQuery } from "redux/api/user/user.api";
import routes from "routing";
import { useNavigate } from "react-router-dom";
import OnBoardingPageContainer from "../../molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "../../molecules/OnBoardingCard/OnBoardingCard";
import CreateTeamForm, {
  CreateTeamFormValues,
} from "../../organisms/CreateTeamForm/CreateTeamForm";

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

  useEffect(() => {
    if (isSuccess && currentUserData && currentUserData.user.organization) {
      // navigate(routes.home.path);
      console.log(routes.home.path);
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
            <CreateTeamForm
              key={index}
              values={team}
              setValues={(values: CreateTeamFormValues) =>
                setTeam(index, values)
              }
            />
          ))}
        </Box>
      </OnBoardingCard>
    </OnBoardingPageContainer>
  );
}

export default OnBoardingTeams;

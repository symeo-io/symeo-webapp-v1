import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, Slider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import SliderMark from "components/atoms/SliderMark/SliderMark";
import standardsData from "standards.json";
import Button from "components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import routes from "routing";
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation,
} from "redux/api/goals/goals.api";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useConfirm } from "providers/confirm/useConfirm";

const standard = standardsData.standards["time-to-merge"] as Standard;

function TimeToMerge() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(standard.recommandedValue);

  const { selectedTeam } = useCurrentUser();
  const { data } = useGetGoalsQuery(
    { teamId: selectedTeam?.id ?? "" },
    { skip: !selectedTeam }
  );
  const [createGoal, { isLoading: isLoadingCreate }] = useCreateGoalMutation();
  const [deleteGoal, { isLoading: isLoadingDelete }] = useDeleteGoalMutation();
  const [updateGoal, { isLoading: isLoadingUpdate }] = useUpdateGoalMutation();

  const goal = useMemo(
    () =>
      data?.team_goals
        ? data.team_goals.find((g) => g.standard_code === standard.code)
        : null,
    [data]
  );

  useEffect(() => {
    if (goal) {
      setValue(goal.value);
    }
  }, [goal]);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!goal) return;

    await updateGoal({ id: goal.id, value });

    return navigate(routes.home.path);
  }, [goal, navigate, updateGoal, value]);

  const handleCreate = useCallback(async () => {
    if (goal || !selectedTeam) return;

    await createGoal({
      standard_code: standard.code,
      value,
      team_id: selectedTeam.id,
    });

    return navigate(routes.home.path);
  }, [createGoal, goal, navigate, selectedTeam, value]);

  const handleDelete = useCallback(async () => {
    if (!goal) return;

    await deleteGoal({ teamGoalId: goal.id });
    return navigate(routes.home.path);
  }, [deleteGoal, goal, navigate]);

  const { handleOpen: openConfirmDelete } = useConfirm({
    title: formatMessage({ id: "standards.delete.confirm.title" }),
    message: formatMessage(
      { id: "standards.delete.confirm.message" },
      {
        standardName: formatMessage({ id: `standards.${standard.code}.title` }),
        teamName: selectedTeam?.name,
      }
    ),
    confirmButton: {
      label: formatMessage({ id: "standards.delete.confirm.confirm-label" }),
      color: "error",
      onClick: handleDelete,
    },
  });

  const marks = useMemo(() => {
    const result = [];
    for (let i = standard.valueRange[0]; i <= standard.valueRange[1]; i++) {
      result.push({
        value: i,
        label: (
          <SliderMark
            value={i}
            info={
              standard.recommandedValue === i
                ? { label: "Recommanded", variant: "success" }
                : undefined
            }
          />
        ),
      });
    }

    return result;
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1100px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage({ id: "standards.time-to-merge.page.title" })}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(8) }}>
        <Typography variant="h2">
          {formatMessage({
            id: "standards.time-to-merge.page.limit-config.title",
          })}
        </Typography>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(5),
            paddingX: (theme) => theme.spacing(2),
          }}
        >
          <Slider
            track={false}
            value={value}
            onChange={handleChange}
            step={1}
            min={standard.valueRange[0]}
            max={standard.valueRange[1]}
            marks={marks}
            sx={{ marginBottom: "62px" }}
          />
        </Box>
      </Box>
      <Divider sx={{ marginTop: (theme) => theme.spacing(3) }} />
      <Box
        sx={{
          paddingY: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={() =>
            navigate(goal ? routes.home.path : routes.teamGoals.path)
          }
        >
          {formatMessage({
            id: "standards.cancel",
          })}
        </Button>
        {!goal && (
          <Button
            loading={isLoadingCreate}
            onClick={handleCreate}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            {formatMessage({
              id: "standards.create",
            })}
          </Button>
        )}
        {goal && (
          <Button
            loading={isLoadingDelete}
            color="error"
            onClick={openConfirmDelete}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            {formatMessage({
              id: "standards.delete.button-label",
            })}
          </Button>
        )}
        {goal && (
          <Button
            loading={isLoadingUpdate}
            onClick={handleSave}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            {formatMessage({
              id: "standards.save",
            })}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default TimeToMerge;

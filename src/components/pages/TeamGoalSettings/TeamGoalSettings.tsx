import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import Button from "components/atoms/Button/Button";
import { useParams } from "react-router-dom";
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} from "redux/api/goals/goals.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useConfirm } from "providers/confirm/useConfirm";
import { useNavigate } from "hooks/useNavigate";
import { standards } from "constants/standards";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";
import dayjs from "dayjs";
import TeamGoalSettingsSlider from "components/organisms/TeamGoalSettingsSlider/TeamGoalSettingsSlider";

function TeamGoalSettings() {
  const { standardCode } = useParams();
  const standard = useMemo(
    // TODO: handle case where no standard is found with code
    () => standards[standardCode as StandardCode],
    [standardCode]
  );

  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(standard.recommandedValue);

  const { selectedTeam, goals } = useCurrentUser();
  const [createGoal, { isLoading: isLoadingCreate }] = useCreateGoalMutation();
  const [deleteGoal, { isLoading: isLoadingDelete }] = useDeleteGoalMutation();
  const [updateGoal, { isLoading: isLoadingUpdate }] = useUpdateGoalMutation();

  const goal = useMemo(
    () => goals?.find((g) => g.standard_code === standard.code) ?? null,
    [goals, standard.code]
  );

  const { data: metricsData } = useGetMetricsQuery(
    {
      teamId: selectedTeam?.id as string,
      standardCode: standardCode as StandardCode,
      startDate: dayjs().subtract(2, "weeks").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam,
    }
  );

  const average = useMemo(
    () =>
      metricsData?.metrics.average.value &&
      Math.round(metricsData?.metrics.average.value),
    [metricsData]
  );

  useEffect(() => {
    if (goal) {
      setValue(goal.value);
    }
  }, [goal]);

  const handleSave = useCallback(async () => {
    if (!goal) return;

    await updateGoal({ id: goal.id, value });

    return navigate("teamGoal", {
      params: { standardCode: standard.code },
    });
  }, [goal, navigate, standard.code, updateGoal, value]);

  const handleCreate = useCallback(async () => {
    if (goal || !selectedTeam) return;

    await createGoal({
      standard_code: standard.code,
      value,
      team_id: selectedTeam.id,
    });

    return navigate("teamGoal", {
      params: { standardCode: standard.code },
    });
  }, [createGoal, goal, navigate, selectedTeam, standard.code, value]);

  const handleDelete = useCallback(async () => {
    if (!goal) return;

    await deleteGoal({ teamGoalId: goal.id });
    return navigate("teamGoals");
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage({ id: `standards.${standard.code}.page.title` })}
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TeamGoalSettingsSlider
          sx={{
            marginTop: (theme) => theme.spacing(8),
            maxWidth: "600px",
            width: "100%",
          }}
          average={average}
          value={value}
          setValue={setValue}
          standard={standard}
        />
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
            goal
              ? navigate("teamGoal", {
                  params: { standardCode: standard.code },
                })
              : navigate("teamGoalsLibrary")
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

export default TeamGoalSettings;

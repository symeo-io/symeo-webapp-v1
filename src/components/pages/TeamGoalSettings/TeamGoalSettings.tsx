import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, Slider, Typography, SliderProps } from "@mui/material";
import { useIntl } from "react-intl";
import SliderMark from "components/atoms/SliderMark/SliderMark";
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

  const max = useMemo(
    () =>
      average
        ? Math.max(average, standard.valueRange[1])
        : standard.valueRange[1],
    [average, standard.valueRange]
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

    return navigate("home");
  }, [goal, navigate, updateGoal, value]);

  const handleCreate = useCallback(async () => {
    if (goal || !selectedTeam) return;

    await createGoal({
      standard_code: standard.code,
      value,
      team_id: selectedTeam.id,
    });

    return navigate("home");
  }, [createGoal, goal, navigate, selectedTeam, standard.code, value]);

  const handleDelete = useCallback(async () => {
    if (!goal) return;

    await deleteGoal({ teamGoalId: goal.id });
    return navigate("home");
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
    const result: SliderProps["marks"] = [];

    if (!average || average !== standard.valueRange[0]) {
      result.push({
        value: standard.valueRange[0],
        label: <SliderMark value={standard.valueRange[0]} />,
      });
    }

    if (!average || average !== max) {
      result.push({
        value: max,
        label: <SliderMark value={max} />,
      });
    }

    if (!average || standard.recommandedValue < average) {
      result.push({
        value: standard.recommandedValue,
        label: (
          <SliderMark
            value={standard.recommandedValue}
            info={{ label: "Recommanded", variant: "success" }}
          />
        ),
      });
    }

    if (average) {
      result.push({
        value: average,
        label: (
          <SliderMark
            value={average}
            info={{
              label: "Your current mean value ",
              variant:
                standard.recommandedValue >= average ? "success" : "warning",
            }}
          />
        ),
      });
    }

    return result;
  }, [average, max, standard.recommandedValue, standard.valueRange]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1441px",
        margin: "auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage({ id: `standards.${standard.code}.page.title` })}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(8) }}>
        <Typography variant="h2">
          {formatMessage({
            id: `standards.${standard.code}.page.limit-config.title`,
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
            step={standard.valueStep}
            min={standard.valueRange[0]}
            max={max}
            marks={marks}
            valueLabelDisplay="on"
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
          onClick={() => navigate(goal ? "home" : "teamGoals")}
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

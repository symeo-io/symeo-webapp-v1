import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, Slider, Typography, SliderProps } from "@mui/material";
import { useIntl } from "react-intl";
import SliderMark from "components/atoms/SliderMark/SliderMark";
import standardsData from "standards.json";
import Button from "components/atoms/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routing";
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} from "redux/api/goals/goals.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useConfirm } from "providers/confirm/useConfirm";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";

function TeamGoalSettings() {
  const { standardCode } = useParams();
  const standard = useMemo(
    // TODO: handle case where no standard is found with code
    () => standardsData.standards[standardCode as StandardCode] as Standard,
    [standardCode]
  );
  console.log("standard", standard);

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
  }, [createGoal, goal, navigate, selectedTeam, standard.code, value]);

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
    const result: SliderProps["marks"] = [];

    [
      standard.valueRange[0],
      standard.recommandedValue,
      standard.valueRange[1],
    ].forEach((value) =>
      result.push({
        value,
        label: (
          <SliderMark
            value={value}
            info={
              standard.recommandedValue === value
                ? { label: "Recommanded", variant: "success" }
                : undefined
            }
          />
        ),
      })
    );

    return result;
  }, [standard.recommandedValue, standard.valueRange]);

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
            max={standard.valueRange[1]}
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

export default TeamGoalSettings;

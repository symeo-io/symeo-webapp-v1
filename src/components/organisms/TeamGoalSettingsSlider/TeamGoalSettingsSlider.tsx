import { Box, Slider, SliderProps, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Standard } from "constants/standards";
import SliderMark from "components/atoms/SliderMark/SliderMark";
import TextField from "components/molecules/TextField/TextField";

export type TeamGoalSettingsSliderProps = PropsWithSx & {
  standard: Standard;
  average: number | undefined;
  value: number;
  setValue: (value: number) => void;
};

function TeamGoalSettingsSlider({
  sx,
  standard,
  average,
  value,
  setValue,
}: TeamGoalSettingsSliderProps) {
  const { formatMessage } = useIntl();

  const max = useMemo(
    () =>
      average
        ? Math.max(average, standard.valueRange.end)
        : standard.valueRange.end,
    [average, standard.valueRange]
  );

  const marks = useMemo(() => {
    const result: SliderProps["marks"] = [];

    if (average === undefined || average !== standard.valueRange.start) {
      result.push({
        value: standard.valueRange.start,
        label: (
          <SliderMark value={standard.valueRange.start} setValue={setValue} />
        ),
      });
    }

    if (!average || average !== max) {
      result.push({
        value: max,
        label: <SliderMark value={max} setValue={setValue} />,
      });
    }

    result.push({
      value: standard.recommandedValue,
      label: (
        <SliderMark
          value={standard.recommandedValue}
          setValue={setValue}
          position="top"
          info={{
            label: formatMessage({
              id: "standards.value.recommanded",
            }),
            variant:
              average === undefined || standard.recommandedValue < average
                ? "success"
                : "secondary",
          }}
        />
      ),
    });

    if (average !== undefined) {
      result.push({
        value: average,
        label: (
          <SliderMark
            value={average}
            setValue={setValue}
            info={{
              label: formatMessage({
                id: "standards.value.mean",
              }),
              tooltipMessage: formatMessage({
                id: "standards.value.mean-tooltip",
              }),
              variant:
                standard.recommandedValue >= average ? "success" : "warning",
            }}
          />
        ),
      });
    }

    return result;
  }, [
    average,
    formatMessage,
    max,
    setValue,
    standard.recommandedValue,
    standard.valueRange,
  ]);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    [setValue]
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setValue(parseInt(event.target.value));
      },
      [setValue]
    );

  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">
          {formatMessage({
            id: `standards.${standard.code}.page.limit-config.title-before-input`,
          })}
        </Typography>
        <TextField
          value={value}
          onChange={handleInputChange}
          type="number"
          sx={{
            fontSize: "1rem",
            width: "6rem",
            marginX: (theme) => theme.spacing(0.5),

            "& .MuiInput-root": {
              marginY: 0,

              "& .MuiInput-input": {
                color: "black",
              },
            },
          }}
        />
        <Typography variant="body2">
          {formatMessage({
            id: `standards.${standard.code}.page.limit-config.title-after-input`,
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
          paddingX: (theme) => theme.spacing(2),
        }}
      >
        <Slider
          track={false}
          value={value}
          onChange={handleSliderChange}
          step={standard.valueStep}
          min={standard.valueRange.start}
          max={max}
          marks={marks}
          valueLabelDisplay="off"
          sx={{
            marginY: "62px",
          }}
        />
      </Box>
    </Box>
  );
}

export default TeamGoalSettingsSlider;

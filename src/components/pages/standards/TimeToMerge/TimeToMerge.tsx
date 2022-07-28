import React, { useCallback, useMemo, useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import SliderMark from "components/atoms/SliderMark/SliderMark";
import standardsData from "standards.json";

const standard = standardsData.standards["time-to-merge"];

function TimeToMerge() {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState<number>(standard.recommandedValue);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    []
  );

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
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TimeToMerge;

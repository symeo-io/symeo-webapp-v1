import React from "react";
import { Vega } from "react-vega";
import { theme } from "theme/theme";
import { colors } from "theme/colors";
import { Box, Typography } from "@mui/material";

function ExampleGraph() {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
      }}
    >
      <Typography
        variant="h1"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        Super histogram
      </Typography>
      <Vega
        actions={false}
        spec={{
          width: 1200,
          height: 480,
          padding: 5,

          data: [
            {
              name: "table",
              values: [
                { x: "02/05", y: 30, c: 0 },
                { x: "02/05", y: 10, c: 1 },
                { x: "09/05", y: 35, c: 0 },
                { x: "09/05", y: 5, c: 1 },
                { x: "16/05", y: 25, c: 0 },
                { x: "16/05", y: 15, c: 1 },
                { x: "23/05", y: 32, c: 0 },
                { x: "23/05", y: 8, c: 1 },
                { x: "06/06", y: 38, c: 0 },
                { x: "06/06", y: 2, c: 1 },
                { x: "13/06", y: 38, c: 0 },
                { x: "13/06", y: 2, c: 1 },
              ],
              transform: [
                {
                  type: "stack",
                  groupby: ["x"],
                  sort: { field: "c" },
                  field: "y",
                },
              ],
            },
          ],

          scales: [
            {
              name: "x",
              type: "band",
              range: "width",
              padding: 0.5,
              domain: { data: "table", field: "x" },
            },
            {
              name: "y",
              type: "linear",
              range: "height",
              nice: true,
              zero: true,
              domain: { data: "table", field: "y1" },
            },
            {
              name: "color",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [
                colors.secondary.shape as string,
                colors.error.surfaceHover as string,
              ],
            },
            {
              name: "cornerRadiusTop",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [0, 4],
            },
            {
              name: "cornerRadiusBottom",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [4, 0],
            },
          ],

          axes: [
            {
              orient: "bottom",
              scale: "x",
              zindex: 1,
              labelFontWeight: 700,
              labelFontSize: 16,
              labelPadding: 8,
              labelFont: theme.typography.fontFamily,
            },
            {
              orient: "left",
              scale: "y",
              zindex: 1,
              labelFontWeight: 700,
              labelFontSize: 16,
              labelPadding: 8,
              labelFont: theme.typography.fontFamily,
            },
          ],

          marks: [
            {
              type: "rect",
              from: { data: "table" },
              encode: {
                enter: {
                  cornerRadiusTopRight: {
                    scale: "cornerRadiusTop",
                    field: "c",
                  },
                  cornerRadiusTopLeft: { scale: "cornerRadiusTop", field: "c" },
                  cornerRadiusBottomRight: {
                    scale: "cornerRadiusBottom",
                    field: "c",
                  },
                  cornerRadiusBottomLeft: {
                    scale: "cornerRadiusBottom",
                    field: "c",
                  },
                  x: { scale: "x", field: "x" },
                  width: { scale: "x", band: 1, offset: -1 },
                  y: { scale: "y", field: "y0" },
                  y2: { scale: "y", field: "y1" },
                  fill: { scale: "color", field: "c" },
                },
                update: {
                  fillOpacity: { value: 1 },
                },
                hover: {
                  fillOpacity: { value: 0.5 },
                },
              },
            },
          ],
        }}
      />
    </Box>
  );
}

export default ExampleGraph;

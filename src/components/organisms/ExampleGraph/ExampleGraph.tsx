import React from "react";
import Plot from "react-plotly.js";
import { theme } from "theme/theme";
import { colors } from "theme/colors";

function ExampleGraph() {
  return (
    <Plot
      data={[
        {
          type: "bar",
          x: ["02/05", "09/05", "16/05", "23/05", "06/06", "13/06"],
          y: [30, 35, 25, 32, 38, 38],
          marker: {
            color: colors.secondary.main,
            size: 0.5,
          },
        },
        {
          type: "bar",
          x: ["02/05", "09/05", "16/05", "23/05", "06/06", "13/06"],
          y: [10, 5, 15, 8, 2, 2],
          marker: {
            color: colors.error.main,
            size: 0.5,
          },
        },
      ]}
      layout={{
        showlegend: false,
        font: {
          family: theme.typography.fontFamily,
          size: theme.typography.fontSize,
        },
        width: 1200,
        height: 480,
        barmode: "stack",
        title: "A Fancy Plot",
        yaxis: {
          tickfont: {
            size: 18,
          },
        },
        xaxis: {
          tickfont: {
            size: 18,
          },
        },
      }}
      config={{ staticPlot: true }}
    />
  );
}

export default ExampleGraph;

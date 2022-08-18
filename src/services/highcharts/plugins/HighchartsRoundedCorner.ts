import Highcharts from "highcharts/highstock";

const RADIUS = 5;

export function applyHighchartsRoundedCorner(H: typeof Highcharts) {
  H.wrap(
    // @ts-ignore
    H.seriesTypes.column.prototype,
    "translate",
    function (this: Highcharts.Series, proceed) {
      proceed.call(this);

      if (this.chart.series.length === 0) {
        return;
      }

      this.points.forEach((point) => {
        if (shouldRoundCorner(point)) {
          convertPointToRounderCornersShape(point, H.relativeLength);
        }
      });
    }
  );
}

function shouldRoundCorner(point: Highcharts.Point): boolean {
  console.log("shouldRoundCorner");
  if (
    point.series.chart.options.plotOptions?.series?.stacking === "normal" ||
    point.series.chart.options.plotOptions?.series?.stacking === "percent" ||
    point.series.chart.options.plotOptions?.column?.stacking === "normal" ||
    point.series.chart.options.plotOptions?.column?.stacking === "percent"
  ) {
    const seriesIndex = point.series.index;
    const firstIndex = point.series.chart.series[0].index;

    if (seriesIndex === firstIndex) {
      return true;
    }

    const aboveCurrentSeries = point.series.chart.series.slice(0, seriesIndex);
    for (const series of aboveCurrentSeries) {
      const abovePoint = series.points[point.index];
      if (abovePoint.y !== 0) {
        return false;
      }
    }

    return true;
  }

  return true;
}

function convertPointToRounderCornersShape(
  point: Highcharts.Point,
  relativeLength: typeof Highcharts.relativeLength
) {
  if (!point.shapeArgs) {
    return;
  }

  const shapeArgs = point.shapeArgs;
  const w = shapeArgs.width;
  const h = shapeArgs.height;
  const x = shapeArgs.x;
  const y = shapeArgs.y;

  // Get the radius
  let rTopLeft = relativeLength(RADIUS, w);
  let rTopRight = relativeLength(RADIUS, w);
  let rBottomRight = relativeLength(0, w);
  let rBottomLeft = relativeLength(0, w);

  if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
    const maxR = Math.min(w, h) / 2;

    if (rTopLeft > maxR) {
      rTopLeft = maxR;
    }

    if (rTopRight > maxR) {
      rTopRight = maxR;
    }

    if (rBottomRight > maxR) {
      rBottomRight = maxR;
    }

    if (rBottomLeft > maxR) {
      rBottomLeft = maxR;
    }

    // Preserve the box for data labels
    // @ts-ignore
    point.dlBox = point.shapeArgs;

    // @ts-ignore
    point.shapeType = "path";
    // @ts-ignore
    point.shapeArgs.d = [
      ["M", x + rTopLeft, y],
      // top side
      ["L", x + w - rTopRight, y],
      // top right corner
      [
        "C",
        x + w - rTopRight / 2,
        y,
        x + w,
        y + rTopRight / 2,
        x + w,
        y + rTopRight,
      ],
      // right side
      ["L", x + w, y + h - rBottomRight],
      // bottom right corner
      [
        "C",
        x + w,
        y + h - rBottomRight / 2,
        x + w - rBottomRight / 2,
        y + h,
        x + w - rBottomRight,
        y + h,
      ],
      // bottom side
      ["L", x + rBottomLeft, y + h],
      // bottom left corner
      [
        "C",
        x + rBottomLeft / 2,
        y + h,
        x,
        y + h - rBottomLeft / 2,
        x,
        y + h - rBottomLeft,
      ],
      // left side
      ["L", x, y + rTopLeft],
      // top left corner
      ["C", x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y],
      ["Z"],
    ];
  }
}

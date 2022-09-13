import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { config } from "config";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(quarterOfYear);

if (config.datadog.clientToken) {
  if (config.env === "production") {
    datadogRum.init({
      applicationId: config.datadog.applicationId,
      clientToken: config.datadog.clientToken,
      site: config.datadog.site,
      service: "symeo-webapp",
      env: config.env,
      sampleRate: 100,
      trackInteractions: true,
    });
  }

  datadogLogs.init({
    clientToken: config.datadog.clientToken,
    site: config.datadog.site,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

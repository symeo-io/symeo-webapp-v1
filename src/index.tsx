import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "config";
import { Provider, ReactReduxContext } from "react-redux";
import { store } from "store";
import { GetTokenProvider } from "providers/GetTokenProvider";
import { theme } from "theme/theme";
import { ThemeProvider } from "@mui/material";
import { RawIntlProvider } from "react-intl";
import { intl } from "intl";
import ConfirmDialogProvider from "providers/confirm/ConfirmDialogProvider";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { LocalStorageContextProvider } from "providers/localStorage/LocalStorageContextProvider";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

dayjs.extend(customParseFormat);

if (config.datadog.clientToken) {
  datadogRum.init({
    applicationId: config.datadog.applicationId,
    clientToken: config.datadog.clientToken,
    site: config.datadog.site,
    service: "catlean-webapp",
    env: config.env,
    sampleRate: 100,
    trackInteractions: true,
  });

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
    <RawIntlProvider value={intl}>
      <Provider store={store} context={ReactReduxContext}>
        <Auth0Provider
          domain={config.auth0.domain}
          clientId={config.auth0.clientId}
          audience={config.auth0.audience}
          redirectUri={window.location.origin}
          cacheLocation="localstorage"
        >
          <GetTokenProvider>
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                  <ConfirmDialogProvider>
                    <LocalStorageContextProvider>
                      <App />
                    </LocalStorageContextProvider>
                  </ConfirmDialogProvider>
                </BrowserRouter>
              </SnackbarProvider>
            </ThemeProvider>
          </GetTokenProvider>
        </Auth0Provider>
      </Provider>
    </RawIntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

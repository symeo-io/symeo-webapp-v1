import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "./config";
import { Provider, ReactReduxContext } from "react-redux";
import { store } from "./store";
import { GetTokenProvider } from "./GetTokenProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <Auth0Provider
        domain={config.auth0.domain}
        clientId={config.auth0.clientId}
        audience={config.auth0.audience}
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
        scope="read:current_user"
      >
        <GetTokenProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GetTokenProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

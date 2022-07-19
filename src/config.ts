export const config = {
  env: process.env.REACT_APP_ENV ?? "",
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
    audience: process.env.REACT_APP_AUTH0_AUDIENCE ?? "",
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? "",
  },
  api: {
    url: process.env.REACT_APP_API_URL ?? "",
  },
  githubApp: {
    name: process.env.REACT_APP_GITHUB_APP_NAME ?? "",
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN ?? "",
  },
};

import React from 'react';
import {Auth0Provider} from "@auth0/auth0-react";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      redirectUri={window.location.origin}
    >
      <Home />
    </Auth0Provider>
  );
}

export default App;

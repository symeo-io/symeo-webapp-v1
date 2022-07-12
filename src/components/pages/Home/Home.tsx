import React from "react";
import logo from "./logo.svg";
import "./Home.css";
import LoginButton from "components/molecules/LoginButton/LoginButton";
import { useGetHistogramQuery } from "redux/api/pull-request/histogram/histogram.api";

function Home() {
  const { data } = useGetHistogramQuery();
  console.log("data", data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginButton />
      </header>
    </div>
  );
}

export default Home;

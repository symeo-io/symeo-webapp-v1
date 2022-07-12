import React from 'react';
import logo from './logo.svg';
import './Home.css';
import LoginButton from "../../molecules/LoginButton/LoginButton";

function Home() {
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

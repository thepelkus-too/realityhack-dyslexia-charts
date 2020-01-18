import React from "react";
import Logo from "./logo";
import UserInfo from "./userInfo";
import Summary from "./summary";
import MostRecent from "./mostRecent";
import PreviousSessions from "./previousSessions";
import "./App.css";

import styled from "styled-components";

const sampleData = [
  {
    timestamp: 1579380059,
    letters: [
      {
        character: "B",
        highScore: 89.5,
        lowScore: 80.0,
        avgScore: 81.0
      },
      {
        character: "C",
        highScore: 19.5,
        lowScore: 10.0,
        avgScore: 15.0
      },
      {
        character: "O",
        highScore: 98.5,
        lowScore: 11.0,
        avgScore: 77.0
      }
    ]
  },

  {
    timestamp: 1579379874,
    letters: [
      {
        character: "A",
        highScore: 89.5,
        lowScore: 10.0,
        avgScore: 45.0
      },
      {
        character: "J",
        highScore: 89.5,
        lowScore: 10.0,
        avgScore: 45.0
      },
      {
        character: "O",
        highScore: 89.5,
        lowScore: 10.0,
        avgScore: 45.0
      }
    ]
  }
];

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto 0;
  max-width: 800px;
`;

function App() {
  return (
    <AppWrapper>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>
        <Logo />
        <UserInfo name="Fake User" id="0001" />
      </div>

      <Summary data={sampleData} />
      <MostRecent data={sampleData} />
      <PreviousSessions data={sampleData} />
    </AppWrapper>
  );
}

export default App;

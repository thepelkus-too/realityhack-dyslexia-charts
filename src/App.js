import React, { useState, useEffect } from "react";
import Logo from "./logo";
import UserInfo from "./userInfo";
import Summary from "./summary";
import MostRecent from "./mostRecent";
import PreviousSessions from "./previousSessions";
import "./App.css";

import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-width: 800px;
`;

const Loading = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://rh2020-dyslexia-db.firebaseio.com/sessions.json?auth=PJX1mOVOPUuwPv7qIyPS0J4jSEsJF4hok0gpBi0b"
      );

      const json = await result.json();

      const sessions = Object.values(json);

      sessions.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });

      console.log(sessions);

      setData(sessions);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <Loading>
        <div>Loading...</div>
      </Loading>
    );
  }

  return (
    <AppWrapper>
      <div>
        <Logo />
        <UserInfo name="Fake User" id="0001" />
      </div>

      <Summary data={data} />
      <MostRecent data={data} />
      <PreviousSessions data={data} />
    </AppWrapper>
  );
}

export default App;

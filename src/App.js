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

const highScoreFromAttempts = attempts =>
  attempts.reduce((acc, attempt) => {
    if (attempt.score > acc) return attempt.score;

    return acc;
  }, 0);

const lowScoreFromAttempts = attempts =>
  attempts.reduce((acc, attempt) => {
    if (attempt.score < acc) return attempt.score;

    return acc;
  }, 101);

const avgScoreFromAttempts = attempts =>
  attempts.reduce((acc, attempt) => {
    return acc + attempt.score / attempts.length;
  }, 0);

const convertData = data => {
  data = data.map(session => {
    let convertedSession = {};

    convertedSession.timestamp = session.dateTime;

    convertedSession.letters = session.letterRounds.map(round => {
      const almostLetter = {};

      almostLetter.timestamp = convertedSession.timestamp;
      almostLetter.character = round.letter;
      almostLetter.highScore = highScoreFromAttempts(round.attempts) * 100;
      almostLetter.lowScore = lowScoreFromAttempts(round.attempts) * 100;
      almostLetter.avgScore = avgScoreFromAttempts(round.attempts) * 100;

      return almostLetter;
    });

    return convertedSession;
  });

  return data;
};

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://rh2020-dyslexia-db.firebaseio.com/sessions.json?auth=PJX1mOVOPUuwPv7qIyPS0J4jSEsJF4hok0gpBi0b"
      );

      const json = await result.json();

      const sessions = Object.values(json);

      const converted = convertData(sessions);

      converted.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });

      setData(converted);
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

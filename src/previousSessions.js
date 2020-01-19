import React from "react";
import AppSection from "./appSection";
import ContentCapsule from "./contentCapsule";
import styled from "styled-components";

const leastSuccessfulFromSession = session => {
  const least = session.letters.reduce(
    (acc, letter) => {
      if (letter.lowScore < acc.lowScore) return letter;

      return acc;
    },
    { lowScore: 101 }
  );

  return least;
};

const mostSuccessfulFromSession = session => {
  const most = session.letters.reduce(
    (acc, letter) => {
      if (letter.highScore > acc.highScore) return letter;

      return acc;
    },
    { highScore: -1 }
  );

  return most;
};

const sessionAverage = session => {
  const sum = session.letters.reduce((acc, letter) => {
    return acc + letter.avgScore;
  }, 0);

  const size = session.letters.length;

  return Math.round(sum / size);
};

const dateFromSession = session => {
  const sessionDate = new Date(session.timestamp * 1000);
  return `${sessionDate.getUTCMonth() +
    1}/${sessionDate.getUTCDate()}/${sessionDate.getUTCFullYear()}`;
};

const SessionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SessionMetaContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
`;

const SessionMeta = props => (
  <SessionMetaContainer>
    <div>Session: #{`${props.sessionIndex}`.padStart(2, "0")}</div>
    <div>Date: {dateFromSession(props.session)}</div>
  </SessionMetaContainer>
);

const ScoresWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-left: 1px solid #d5d5d5;
  flex: 4;
`;

const ScoresData = styled.div`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ScoresDataTitle = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #4e4e4e;
`;
const ScoresDataTitleOnly = styled(ScoresDataTitle)`
  margin-bottom: 1em;
`;

const ScoresDataSubtitle = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #939393;
`;
const ScoresLetter = styled.div`
  background: #f4f4f4;
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ScoresPercentage = styled.span`
  font-weight: 300;
  font-size: 42px;
  line-height: 49px;
`;
const ScoresBestPercentage = styled(ScoresPercentage)`
  color: #1baf44;
`;
const ScoresWorstPercentage = styled(ScoresPercentage)`
  color: #d93c3c;
`;

const ScoresDataDatums = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const SessionHighLow = props => {
  const lowScoreData = leastSuccessfulFromSession(props.session);
  const highScoreData = mostSuccessfulFromSession(props.session);

  return (
    <ScoresWrapper>
      <ScoresData>
        <ScoresDataTitle>Avg. Proficiency</ScoresDataTitle>
        <ScoresDataSubtitle>(This session)</ScoresDataSubtitle>
        <ScoresPercentage>{sessionAverage(props.session)}%</ScoresPercentage>
      </ScoresData>
      <ScoresData>
        <ScoresDataTitleOnly>Least Successful Attempt</ScoresDataTitleOnly>
        <ScoresDataDatums>
          <ScoresLetter>{lowScoreData.character}</ScoresLetter>
          <ScoresWorstPercentage>
            {lowScoreData.lowScore}%
          </ScoresWorstPercentage>
        </ScoresDataDatums>
      </ScoresData>
      <ScoresData>
        <ScoresDataTitleOnly>Most Successful Attempt</ScoresDataTitleOnly>
        <ScoresDataDatums>
          <ScoresLetter>{highScoreData.character}</ScoresLetter>
          <ScoresBestPercentage>
            {Math.round(highScoreData.highScore)}%
          </ScoresBestPercentage>
        </ScoresDataDatums>
      </ScoresData>
    </ScoresWrapper>
  );
};

const PreviousSession = props => (
  <ContentCapsule>
    <SessionWrapper>
      <SessionMeta session={props.session} sessionIndex={props.sessionIndex} />
      <SessionHighLow session={props.session} />
    </SessionWrapper>
  </ContentCapsule>
);

function PreviousSessions(props) {
  return (
    <AppSection title="Session History">
      {props.data.map((session, i) => (
        <PreviousSession
          session={session}
          sessionIndex={props.data.length - i}
        />
      ))}
    </AppSection>
  );
}

export default PreviousSessions;

import React from "react";
import AppSection from "./appSection";
import ContentCapsule from "./contentCapsule";
import styled from "styled-components";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const allLettersFromSessionList = data => {
  let letters = [];

  for (let session of data) {
    letters = [...letters, ...session.letters];
  }

  const uniqued = letters.reduce((acc, letter) => {
    if (acc.find(item => item.character === letter.character)) return acc;

    return [...acc, letter];
  }, []);

  uniqued.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const firstSix = uniqued.slice(0, 6);

  const mappedToPercentage = firstSix.map(letter => {
    const copied = { ...letter };

    copied.highScore /= 100;
    copied.avgScore /= 100;
    copied.lowScore /= 100;

    return copied;
  });

  return mappedToPercentage;
};

const MostRecentWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
`;

const Legend = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 1em 0 2em;
`;

const LegendBullet = styled.div`
  border-radius: 12.5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  padding: 6px 0;
  text-align: center;
`;

const HighBullet = styled(LegendBullet)`
  color: #1baf44;
  background: #d3f8dd;
`;

const AvgBullet = styled(LegendBullet)`
  color: #494a7e;
  background: #dfe0ec;
`;

const LowBullet = styled(LegendBullet)`
  color: #d93c3c;
  background: #f7d4d4;
`;

const ChartWrapper = styled.div`
  flex: 5;
`;

function MostRecent(props) {
  const recentLetterData = allLettersFromSessionList(props.data);

  const domain = [0, 1];
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const toPercent = something => something * 100 + "%";

  const dot = (cf, cb, yOffset) => something => {
    if (!yOffset) {
      yOffset = 0;
    }

    const newX = something.cx;
    const newY = something.cy + 8 + yOffset;
    return (
      <g>
        <rect
          x={newX - 25}
          y={newY - 9}
          rx="10"
          width="50"
          height="16"
          fill={cb}
        ></rect>
        <text
          id={something.key}
          x={newX}
          y={newY}
          fill={cf}
          dominant-baseline="middle"
          text-anchor="middle"
          style={{ font: "italic 13px sans-serif" }}
        >
          {Math.round(something.value * 100)}%
        </text>
      </g>
    );
  };

  return (
    <AppSection title="Most Recent">
      <ContentCapsule>
        <MostRecentWrapper>
          <Legend>
            <HighBullet>Highest Score</HighBullet>
            <AvgBullet>Avg. Score</AvgBullet>
            <LowBullet>Lowest Score</LowBullet>
          </Legend>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={182}>
              <LineChart data={recentLetterData}>
                <Line
                  type="monotone"
                  dataKey="lowScore"
                  strokeWidth="0"
                  dot={dot("#d93c3c", "#f7d4d4", 4)}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  strokeWidth="0"
                  dot={dot("#494a7e", "#dfe0ec", 2)}
                />
                <Line
                  type="monotone"
                  dataKey="highScore"
                  strokeWidth="0"
                  dot={dot("#1baf44", "#d3f8dd")}
                />

                <CartesianGrid strokeDasharray="2 2" />
                <XAxis
                  dataKey="character"
                  interval={0}
                  padding={{ left: 30, right: 30 }}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  domain={domain}
                  tick={{ fontSize: 10 }}
                  ticks={ticks}
                  tickCount={10}
                  tickFormatter={toPercent}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </MostRecentWrapper>
      </ContentCapsule>
    </AppSection>
  );
}

export default MostRecent;

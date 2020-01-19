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

const data = [
  { name: "01/20/2019", avg: 0.2 },
  { name: "01/20/2019", avg: 0.22 },
  { name: "01/20/2019", avg: 0.2 },
  { name: "01/20/2019", avg: 0.35 },
  { name: "01/20/2019", avg: 0.61 },
  { name: "01/20/2019", avg: 0.78 },
  { name: "01/20/2019", avg: 0.74 }
];

const SummaryContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const SummaryData = styled.div`
  width: 137px;
`;

const SummaryHeader = styled.div`
  width: 137px;
  font-size: 12px;
  line-height: 16px;
`;

const SummaryPercentage = styled.div`
  font-weight: 300;
  font-size: 42px;
  line-height: 49px;
  color: #494a7e;
`;

const dateFromTimestamp = ts => {
  const sessionDate = new Date(ts * 1000);
  return `${sessionDate.getUTCMonth() +
    1}/${sessionDate.getUTCDate()}/${sessionDate.getUTCFullYear()}`;
};

const dateRangeFromData = data => {
  let startDate;
  let endDate;

  let earliestTimestamp = Number.MAX_SAFE_INTEGER;
  let latestTimestamp = Number.MIN_SAFE_INTEGER;

  for (let session of data) {
    if (session.timestamp > latestTimestamp)
      latestTimestamp = session.timestamp;
    if (session.timestamp < earliestTimestamp)
      earliestTimestamp = session.timestamp;
  }

  startDate = dateFromTimestamp(earliestTimestamp);
  endDate = dateFromTimestamp(latestTimestamp);

  return `${startDate} - ${endDate}`;
};

const avgFromData = data => {
  let count = 0;
  const avgSum = data.reduce((dataAcc, session) => {
    return (
      dataAcc +
      session.letters.reduce((sessAcc, letter) => {
        count++;
        return sessAcc + letter.avgScore;
      }, 0)
    );
  }, 0);

  return Math.round(avgSum / count);
};

const chartDataFromData = data => {
  return data.map(session => {
    let name;
    let avg;

    name = dateFromTimestamp(session.timestamp);

    avg =
      session.letters.reduce((sessAcc, letter) => {
        return sessAcc + letter.avgScore / session.letters.length;
      }, 0) / 100;

    return { name: name, avg: avg };
  });
};

function Summary(props) {
  const domain = [0, 1];
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const toPercent = something => something * 100 + "%";

  return (
    <AppSection title="Overall">
      <ContentCapsule>
        <SummaryContent>
          <SummaryData>
            <SummaryHeader>
              Avg. Proficiency Overall
              <br />
              {dateRangeFromData(props.data)}
            </SummaryHeader>
            <SummaryPercentage>{avgFromData(props.data)}%</SummaryPercentage>
          </SummaryData>

          <ResponsiveContainer width="100%" height={182}>
            <LineChart data={chartDataFromData(props.data)}>
              <Line type="monotone" dataKey="avg" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis
                dataKey="name"
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
        </SummaryContent>
      </ContentCapsule>
    </AppSection>
  );
}

export default Summary;

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
              12/20/2019 - 01/20/2018
            </SummaryHeader>
            <SummaryPercentage>82%</SummaryPercentage>
          </SummaryData>

          <ResponsiveContainer width="100%" height={182}>
            <LineChart data={data}>
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

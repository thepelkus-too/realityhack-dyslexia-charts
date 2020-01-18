import React from "react";
import styled from "styled-components";

const AppSectionWrapper = styled.div``;

const AppSectionTitle = styled.h2`
  font-size: 18px;
  font-weight: normal;
  line-height: 109%;
  margin-top: 40px;
`;

function AppSection(props) {
  return (
    <AppSectionWrapper>
      <AppSectionTitle>{props.title}</AppSectionTitle>
      {props.children}
    </AppSectionWrapper>
  );
}

export default AppSection;

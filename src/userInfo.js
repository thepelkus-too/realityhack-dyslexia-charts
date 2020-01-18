import React from "react";
import styled from "styled-components";

const UserInfoWrapper = styled.div`
  margin: 1em 0 0;
`;

const InfoItem = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const InfoLabel = styled.span`
  color: #939393;
`;

const InfoValue = styled.span`
  color: #4e4e4e;
`;

const UserInfo = () => (
  <UserInfoWrapper>
    <InfoItem>
      <InfoLabel>User Name: </InfoLabel>
      <InfoValue>Test User</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>User ID: </InfoLabel>
      <InfoValue>#0001</InfoValue>
    </InfoItem>
  </UserInfoWrapper>
);

export default UserInfo;

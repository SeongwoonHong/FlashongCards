import React from 'react';
import styled from 'styled-components';
import { colors } from 'constant';

const Tab = ({ count, text, isActive }) => {
  return (
    <StyledTab isActive={isActive}>
      <StyledTabContent>
        {text} - {count}
      </StyledTabContent>
    </StyledTab>
  );
};

const StyledTab = styled.div`
  background-color: ${props => props.isActive ? colors.activeTab : colors.inActiveTab};
  width: 100%;
  text-align: center;
  margin: 2px;
  cursor: pointer;
`;

const StyledTabContent = styled.div`
  padding: 10px 5px;
  text-transform: uppercase;
`;

export default Tab;

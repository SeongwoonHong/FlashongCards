import React from 'react';
import styled from 'styled-components';
import { colors } from 'constant';

const Tab = ({ onClick, count, text, isActive }) => {
  return (
    <StyledTab
      isActive={isActive}
      onClick={onClick}
    >
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

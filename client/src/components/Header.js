import React from 'react';
import styled from 'styled-components';
import { colors } from 'constant';

const Header = () => {
  return (
    <StyledHeader>TODO LIST</StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  text-align: center;
  color: ${colors.white};
  padding: 20px;
`;

import React from 'react';
import styled from 'styled-components';
import { colors } from 'constant';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

const Footer = ({ openAddCard, isHide }) => {
  return (
    <StyledFooter isHide={isHide}>
      <div onClick={openAddCard}>
        <AddIcon />
      </div>
      <div>
        <SettingsIcon />
      </div>
      <div>
        <SearchIcon />
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${colors.headerTheme};
  display: ${props => props.isHide ? 'none' : 'block'};

  div {
    width: 33%;
    text-align: center;
    height: 50px;
    display: inline-block;
    position: relative;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default Footer;

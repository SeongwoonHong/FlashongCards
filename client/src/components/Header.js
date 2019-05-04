import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'constant';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const Header = () => {
  const [isMenuOpened, toggleIsMenuOpened] = useState(false);

  return (
    <StyledHeader>
      <div>
        <div className={cx('submenu-container', { open: isMenuOpened } )}>
          <Link
            to="/login"
            className="submenu"
          >
            <div className="submenu-text">Login</div>
          </Link>
          <Link
            to="/signup"
            className="submenu"
          >
            <div className="submenu-text">Sign up</div>
          </Link>
        </div>
      </div>

      <div
        className={cx('hamburger-menu', { open: isMenuOpened })}
        onClick={() => toggleIsMenuOpened(!isMenuOpened)}
      >
        <span className="menu-item"></span>
        <span className="menu-item"></span>
        <span className="menu-item"></span>
      </div>
      <StyledHeaderText>Flashong Cards</StyledHeaderText> 
    </StyledHeader>
  );
};


export default Header;

const StyledHeader = styled.div`
  padding: 10px 0;
  position: relative;
  background-color: ${colors.headerTheme};

  .submenu-container {
    background-color: ${colors.primary};
    opacity: 0.8;
    height: 0px;
    margin: 0px; 
    padding: 0px; 
    position: absolute;
    top: 42px;
    left: 0px;
    width: 100%;
    z-index: -100;
    transition: all 0.5s ease-out;

    .submenu {
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: block;
      text-decoration: none;

      .submenu-text {
        color: ${colors.white};
        display: block;
        padding: 15px 0;
        text-align: center;
        transition: all 0.3s ease-in-out;
        
        &:hover {
          background-color: lighten(#222222, 5%);
        }
      }
    }

    &.open {
      height: 100px;
      z-index: 10000;
    }
  }

  .hamburger-menu {
    position: absolute;
    left: 10px;
    top: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    .menu-item {
      background: ${colors.white};
      display: block;
      height: 3px;
      margin: 0 0 6px;
      transition: all 0.3s ease-in-out;
      width: 40px;
    }
      
    &.open {
      .menu-item {
        margin: 0 0 5px;

        &:first-child {
          transform: rotate(45deg);
          transform-origin: 10px;
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
          transform-origin: 8px;
        }
      }
    }
  }
`;

const StyledHeaderText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${colors.white};
`;

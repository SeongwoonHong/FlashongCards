import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { colors } from 'constant';
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { CHECK_LOGIN } from 'queries';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';

const cookies = new Cookies();

const token = cookies.get('FLASHONG_AUTH_TOKEN');

const Header = ({ loading, checkLogin, history }) => {
  const [isMenuOpened, toggleIsMenuOpened] = useState(false);

  function logout(apolloClient) {
    toggleIsMenuOpened(false);
    cookies.remove('FLASHONG_AUTH_TOKEN', { path: '/' });
    apolloClient.resetStore();

    return history.push('/login');
  }

  if (loading) {
    return null;
  }

  return (
    <ApolloConsumer>
      {client => (
        <StyledHeader>
          <div>
            <div className={cx('submenu-container', { open: isMenuOpened } )}>
              {
                checkLogin ? (
                  <Fragment>
                    <Link
                      className="submenu"
                      onClick={() => logout(client)}
                    >
                      <div className="submenu-text">Log Out</div>
                    </Link>
                  </Fragment>
                )
                  :
                (
                  <Fragment>
                    <Link
                      to="/login"
                      className="submenu"
                      onClick={() => toggleIsMenuOpened(false)}
                    >
                      <div className="submenu-text">Login</div>
                    </Link>
                    <Link
                      to="/signup"
                      className="submenu"
                      onClick={() => toggleIsMenuOpened(false)}
                    >
                      <div className="submenu-text">Sign up</div>
                    </Link>
                  </Fragment>
                )
              }
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
          <StyledHeaderText to="/main">Flashong Cards</StyledHeaderText> 
        </StyledHeader>
      )}
    </ApolloConsumer>
  );
};

const withCheckLogin = graphql(CHECK_LOGIN, {
  options: (props) => ({
    variables: {
      token
    }
  }),
  props: ({ data: { checkLogin, loading } }) => {
    return {
      checkLogin,
      loading
    }
  }
})

export default compose(
  withRouter,
  withCheckLogin
)(Header);

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  left: 0;
  width: 100%;
  height: 42px;
  background-color: ${colors.headerTheme};

  .submenu-container {
    background-color: ${colors.primary};
    height: 0px;
    margin: 0px; 
    padding: 0px;
    position: absolute;
    top: 42px;
    left: 0px;
    width: 100%;
    z-index: -100;
    transition: all 0.25s ease-out;

    .submenu {
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: none;
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

      .submenu {
        display: block;
      }
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

const StyledHeaderText = styled(({ children, className, ...rest}) => (
  <Link className={className} {...rest}>
    {children}
  </Link>
))`
  text-align: center;
  text-decoration: none;
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  color: ${colors.white};
`;

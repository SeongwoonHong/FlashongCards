import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'constant';
import { Link } from 'react-router-dom';
import img from 'assets/login.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login(e) {
    e.preventDefault();

    console.log('username = ', username);
    console.log('password = ', password)
  }

  return (
    <StyledLogin onSubmit={login}>
      <StyledLeft>
        <StyledDiv>
          <StyledHeader><strong>Hello!</strong> Welcome to my Todo application</StyledHeader>
          <StyledSubHeader>Please login to enjoy it!</StyledSubHeader>
          <StyledUsername>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </StyledUsername>
          <StyledPassword>
            <input
              type="text"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledPassword>
          <StyledLoginBtn>
            <div>log in</div>
          </StyledLoginBtn>
          <StyledAccount to="/signup">Don't have an account?</StyledAccount>
        </StyledDiv>
      </StyledLeft>
      <StyledRight>
        <img
          src={img}
          alt=""
        />
      </StyledRight>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.form`
  text-transform: uppercase;
  color: ${colors.white};
  width: 100%;
  height: 100vh;
  display: flex;
  
  input {
    width: 10em;
    font-size: 18px;
    text-align:center;
    border: 0;
    outline: 0;
    color: ${colors.white};
    background: transparent;
    border:0.033em ${colors.white} solid;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding-top: 5px;

    &::placeholder {
      color: ${colors.white};
      opacity: 0.8;
    }
    
    &::-moz-placeholder {
      color: ${colors.white};
      opacity: 0.8;
    }
    
    &:-ms-input-placeholder {
      color: ${colors.white};
      opacity: 0.8;
    }
    
    &::-webkit-input-placeholder {
      color: ${colors.white};
      opacity: 0.8;
    }
  }
`;

const StyledLeft = styled.div`
  display: inline-block;
  width: 50%;
  background-color: ${colors.loginTheme};
  height: 100%;
  position: relative;
`;

const StyledHeader = styled.div`
  color: ${colors.primary};
  text-align: center;
  font-size: 25px;
`;

const StyledSubHeader = styled.div`
  color: ${colors.primary};
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
`;

const StyledRight = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  display: inline-flex;
  flex-direction: column;

  img {
    height: 100%;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const StyledUsername = styled.div`
  background-color: ${colors.loginUsername};
  position: relative;
  height: 6.25em;
  width: 60%;
  margin: 0 auto;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  
  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-style: solid;
    border-width: 0.5em 0.469em 0 0.469em;
    border-color: ${colors.loginUsername} transparent transparent transparent;
    top: 6.25em;
    left: 50%;
    margin-left: -0.496em;
    z-index: 1;
  }
`;

const StyledPassword = styled.div`
  background-color: ${colors.loginPassword};
  position: relative;
  height: 6.25em;
  width: 60%;
  margin: 0 auto;

  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-style: solid;
    border-width: 0.5em 0.469em 0 0.469em;
    border-color: ${colors.loginPassword} transparent transparent transparent;
    bottom: -0.5em;
    left: 50%;
    margin-left: -0.496em;
    z-index: 1;
  }
`;

const StyledLoginBtn = styled.button`
  background-color: ${colors.loginButton};
  height: 6.25em;
  width: 60%;
  margin: 0 auto;
  display: block;
  position: relative;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  div {
    font-size: 18px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    color: ${colors.white};
    text-transform: uppercase;
  }
`;

const StyledAccount = styled(({ className, children, ...rest }) => (
  <Link
    className={className}
    {...rest}
  >
    {children}
  </Link>
))`
  color: ${colors.black};
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  text-align: center;
  font-weight: bold;
`;

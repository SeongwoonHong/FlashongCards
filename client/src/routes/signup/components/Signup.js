import React, { useState, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { SIGNUP_MUTATION } from 'queries';
import styled from 'styled-components';
import { colors } from 'constant';
import { Link } from 'react-router-dom';
import img from 'assets/signup.jpg';

const Signup = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitHandler(e) {
    e.preventDefault();

    if (name.trim() === '' || password.trim() === '' || passwordConfirm.trim() === '') {
      return;
    }

    props.signup(name, password, passwordConfirm);

    return setIsSubmitted(true);
  }

  return (
    <StyledSignup onSubmit={submitHandler}>
      <StyledLeft>
        <StyledDiv>
          {
            isSubmitted ?
            (
              <div>Done!</div>
            ) :
            (
              <Fragment>
                <StyledHeader>Don't have an <strong>account?</strong></StyledHeader>
                <StyledSubHeader>Please sign up to enjoy it!</StyledSubHeader>
                <StyledUsername>
                  <input
                    value={name}
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </StyledUsername>
                <StyledPassword>
                  <input
                    value={password}
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </StyledPassword>
                <StyledPassword className="password-confirm">
                  <input
                    value={passwordConfirm}
                    type="password"
                    placeholder="Password Confirm"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </StyledPassword>
                <StyledSignupBtn>
                  <div>Sign up</div>
                </StyledSignupBtn>
              </Fragment>
            )
          }
          <StyledLogin to="login">
            Login
          </StyledLogin>
        </StyledDiv>
      </StyledLeft>
      <StyledRight>
        <img
          src={img}
          alt=""
        />
      </StyledRight>
    </StyledSignup>
  );
};

const withSignupMutation = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: (username, password) => {
      mutate({
        variables: {
          username,
          password
        }
      })
    }
  })
})

export default withSignupMutation(Signup);

const StyledSignup = styled.form`
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
`
const StyledLeft = styled.div`
  display: inline-block;
  width: 50%;
  background-color: ${colors.signupTheme};
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
  display: inline-block;
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

  &.password-confirm {
    opacity: 0.6;
  }

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

const StyledSignupBtn = styled.button`
  background-color: ${colors.loginButton};
  height: 6.25em;
  width: 60%;
  margin: 0 auto;
  display: block;
  position: relative;
  cursor: pointer;
  
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

const StyledLogin = styled(({ className, children, ...rest }) => (
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
  font-weight: bold;
  text-align: center;
`;

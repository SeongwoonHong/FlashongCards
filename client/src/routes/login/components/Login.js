import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'constant';
import { InputBox } from 'components';
import { graphql } from 'react-apollo';
import { LOGIN_MUTATION } from 'queries';
import { Link } from 'react-router-dom';
import img from 'assets/login.jpg';

const Login = ({ login, loading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSubmitHandler(e) {
    e.preventDefault();
    console.log('loading = ', loading)
    if (username.trim() !== '' && password.trim() !== '') {
      console.log('username = ', username);
      console.log('password = ', password)
      login(username, password);
      console.log('loading = ', loading)
    }
  }

  return (
    <StyledLogin onSubmit={onSubmitHandler}>
      <StyledLeft>
        <StyledDiv>
          <StyledHeader><strong>Hello!</strong> Welcome!</StyledHeader>
          <StyledSubHeader>Please login to enjoy it!</StyledSubHeader>
          <InputBox
            backgroundColor={colors.usernameTheme}
            borderTopLeftRadius="5px"
            borderTopRightRadius="5px"
            inputBorderColor={colors.usernameTheme}
          >
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputBox>
          <InputBox
            backgroundColor={colors.passwordTheme}
            inputBorderColor={colors.passwordTheme}
          >
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputBox>
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

const withLoginMutation = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: (username, password) => {
      mutate({
        variables: {
          username,
          password,
        }
      })
    }
  })
})

export default withLoginMutation(Login);

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

  @media (max-width: 550px) {
    width: 100%;
  }
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

  @media (max-width: 550px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const StyledLoginBtn = styled.button`
  background-color: ${colors.loginButton};
  height: 100px;
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

  @media (max-width: 550px) {
    width: 80%;
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
  margin-top: 40px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  text-align: center;
  font-weight: bold;
`;

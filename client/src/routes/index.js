import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app';
import Signup from './signup';
import Login from './login';
import styled from 'styled-components';

const Routes = props => {
  return (
    <StyledRoutes>
      {/* <StyledImg src={torontoPicture} /> */}
      <StyledContainer>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </StyledContainer>
    </StyledRoutes>
  );
};

Routes.propTypes = {
  
};

export default Routes;

const StyledRoutes = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  margin: 0 auto;
`;


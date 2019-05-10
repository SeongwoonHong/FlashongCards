import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'components';

import Main from './main';
import Signup from './signup';
import Login from './login';
import styled from 'styled-components';

const Routes = () => (
  <StyledRoutes>
    <StyledContainer>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </StyledContainer>
  </StyledRoutes>
);

export default Routes;

const StyledRoutes = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  margin: 0 auto;
`;


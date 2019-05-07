import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import App from './components/app';
import AddCard from './components/add-card';

const Main = props => {
  return (
    <Fragment>
      <StyledSwitch>
        <Switch>
          <Route exact path="/main" component={App} />
          <Route path="/main/add-card" component={AddCard} />
        </Switch>
      </StyledSwitch>
    </Fragment>
  );
};

const StyledSwitch = styled.div`
  margin-top: 50px;
`;

export default Main;

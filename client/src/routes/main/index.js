import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'components';
import App from './components/app';
import AddCard from './components/add-card';

const Main = props => {
  return (
    <Fragment>
      <Header />      
      <Switch>
        <Route exact path="/main" component={App} />
        <Route path="/main/add-card" component={AddCard} />
      </Switch>
    </Fragment>
  );
};

export default Main;

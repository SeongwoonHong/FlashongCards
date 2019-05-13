import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import App from './components/app';
import AddCard from './components/add-card';
import { Query } from 'react-apollo';
import { Cookies } from 'react-cookie';
import { CHECK_LOGIN } from 'queries';
import { Loader } from 'components';

const cookies = new Cookies();

const token = cookies.get('FLASHONG_AUTH_TOKEN');

const Main = props => {
  return (
    <Query
      query={CHECK_LOGIN}
      variables={{ token }}
      fetchPolicy="network-only"
    >
      {({ loading, data, client }) => {
        if (loading) return <Loader />;

        if (!data || !data.checkLogin) {
          return <Redirect to="/login" />;
        }

        client.writeData({ data: {
          currentUser: data.checkLogin
        }});

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
      }}
    </Query>
  );
};

const StyledSwitch = styled.div`
  margin-top: 50px;
`;

export default Main;

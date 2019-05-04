import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import CardList from './CardList';
import { Header } from 'components';

const App = ({ visibilityFilter = 'ACTIVE', loading }) => {
  return (
    <Fragment>
      <Header />
      {/* <AddTodo
        placeholder="What needs to be done?"
        visible={visibilityFilter === 'ACTIVE'}
      /> */}
      <CardList
      />
    </Fragment>
  );
}

export default App;

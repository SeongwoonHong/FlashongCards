import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { GET_VISIBILITY_FILTER } from 'queries';
import TodoList from './TodoList';
import { ToggleVisibility, AddTodo, Header } from 'components';

const App = ({ visibilityFilter = 'ACTIVE', loading }) => {
  return (
    <Fragment>
      <Header />
      <ToggleVisibility
        visibilityFilter={visibilityFilter}
        loading={loading}
      />
      <AddTodo
        placeholder="What needs to be done?"
        visible={visibilityFilter === 'ACTIVE'}
      />
      <TodoList
        visibilityFilter={visibilityFilter}
      />
    </Fragment>
  );
}

const withToggleVisibilityData = graphql(GET_VISIBILITY_FILTER, {
  props: ({ data: { visibilityFilter, loading }}) => ({
    visibilityFilter,
    loading
  })
})

export default withToggleVisibilityData(App);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { GET_TODO_BY_USER_QUERY, TOGGLE_DONE_TODO_MUTATION, REMOVE_TODO_MUTATION } from 'queries';
import Todo from './Todo';

const StyledTodoList = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const TodoList = ({ todoByUser, toggleTodo, removeTodo, loading, visibilityFilter }) => {
  if (loading) {
    return null;
  }
  let filteredTodos;

  if (visibilityFilter === 'COMPLETED') {
    filteredTodos = todoByUser.filter((todo) => todo.is_done);
  } else {
    filteredTodos = todoByUser.filter((todo) => !todo.is_done);
  }

  return (
    <StyledTodoList>
      {
        filteredTodos.map((todo) => {
          return (
            <Todo
              data={todo}
              key={todo.todo_id}
              visibilityFilter={visibilityFilter}
              toggleTodo={(id, status) => toggleTodo(id, status)}
              removeTodo={(id) => removeTodo(id)}
            />
          );
        })
      }
    </StyledTodoList>
  );
};

const withGetTodoList = graphql(GET_TODO_BY_USER_QUERY, {
  options: (props) => ({
    variables: {
      user_id: 1,
    },
  }),
  props: ({ data: { todoByUser, loading, visibilityFilter } }) => ({
    todoByUser,
    loading,
    visibilityFilter
  })
})

const withToggleTodoList = graphql(TOGGLE_DONE_TODO_MUTATION, {
  props: ({ mutate }) => ({
    toggleTodo: (todo_id, is_done) => {
      mutate({
        variables: {
          todo_id,
          is_done,
        },
        refetchQueries: [
          {
            query: GET_TODO_BY_USER_QUERY,
            variables: {
              user_id: 1
            }
          }
        ]
      })
    }
  })
})

const withDeleteTodoList = graphql(REMOVE_TODO_MUTATION, {
  props: ({ mutate }) => ({
    removeTodo: (todo_id) => {
      mutate({
        variables: {
          todo_id
        },
        refetchQueries: [
          {
            query: GET_TODO_BY_USER_QUERY,
            variables: {
              user_id: 1
            }
          }
        ]
      })
    }
  })
});

TodoList.propTypes = {
  data: PropTypes.array,
};

export default compose(
  withGetTodoList,
  withToggleTodoList,
  withDeleteTodoList,
)(TodoList);

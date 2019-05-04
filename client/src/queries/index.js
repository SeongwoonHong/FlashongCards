import gql from 'graphql-tag';

export const GET_TODO_BY_USER_QUERY = gql`
  query TodoByUser($user_id: ID!) {
    todoByUser(user_id: $user_id) {
      todo_id
      title
      is_done
      creation_date
      update_date
    }
    visibilityFilter @client
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      user_id
      username
      signup_date
    }
  }
`;

export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($user_id: ID!, $title: String!) {
    addTodo(user_id: $user_id, title: $title) {
      todo_id
      title
      is_done
      creation_date
      update_date
    }
  }
`;

export const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

export const TOGGLE_DONE_TODO_MUTATION = gql`
  mutation ToggleDoneTodo($todo_id: ID!, $is_done: Boolean!) {
    toggleIsDoneTodo(todo_id: $todo_id, is_done: $is_done) {
      todo_id
      user_id
      title
      is_done
    }
  }
`;

export const REMOVE_TODO_MUTATION = gql`
  mutation RemoveTodo($todo_id: ID!) {
    removeTodo(todo_id: $todo_id) {
      todo_id
    }
  }
`;

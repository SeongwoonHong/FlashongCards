import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!, $passwordConfirm: String!) {
    signup(username: $username, password: $password, passwordConfirm: $passwordConfirm) {
      user_id
      username
      signup_date
    }
  }
`;

export const ADD_CARD_MUTATION = gql`
  mutation AddCard($user_id: ID!, $front: String!, $back: String!) {
    addCard(user_id: $user_id, front: $front, back: $back) {
      card_id
      front
      back
      creation_date
      modification_date
    }
  }
`;

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($card_id: ID!) {
    deleteCard(card_id: $card_id) {
      card_id
      front
      back
      creation_date
      modification_date
    }
  }
`;

export const GET_ALL_CARDS_QUERY = gql`
  query Cards($user_id: ID!) {
    cards(user_id: $user_id) {
      card_id
      user_id
      front
      back
      creation_date
      modification_date
      is_studied
      is_favorite
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user_id
      username
      token
    }
  }
`;

export const CHECK_LOGIN = gql`
  query CheckLogin($token: String) {
    checkLogin(token: $token) {
      user_id
      username
      signup_date
      email
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser @client {
      user_id
      username
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($card_id: ID!, $is_studied: Boolean, $is_favorite: Boolean, $front: String, $back: String) {
    updateCard(card_id: $card_id, is_studied: $is_studied, is_favorite: $is_favorite, front: $front, back: $back) {
      user_id
      card_id
      front
      back
      is_studied
      is_favorite
    }
  }
`;

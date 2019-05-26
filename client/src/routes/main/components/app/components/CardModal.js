import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { ADD_CARD_MUTATION, GET_ALL_CARDS_QUERY, GET_CURRENT_USER, UPDATE_CARD } from 'queries';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const AddCard = ({
  addCard,
  updateCard,
  currentUser,
  mode = 'ADD_CARD',
  editData = {},
  closeModal,
}) => {
  const [front, setFront] = useState(mode === 'ADD_CARD' ? '' : editData.front);
  const [back, setBack] = useState(mode === 'ADD_CARD' ? '' : editData.back);

  function onClickHandler(e) {
    e.preventDefault();

    if (front.trim() !== '' && back.trim() !== '') {
      if (mode === 'ADD_CARD') {
        addCard(currentUser.user_id, front, back);
        
        setFront('');
        setBack('');
      } else {
        updateCard(currentUser.user_id, editData.card_id, front, back);
      }
      return closeModal();
    }
  }

  return (
    <StyledAddCard>
      <TextField
        id="outlined-multiline-flexible"
        label="Front"
        multiline
        rowsMax="6"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        margin="normal"
        variant="outlined"
        className="front"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Back"
        multiline
        rows={10}
        rowsMax="15"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        margin="normal"
        variant="outlined"
        className="back"
      />
      <Divider />
      <Button
        variant="contained"
        color="primary"
        onClick={onClickHandler}
      >
        { mode === 'ADD_CARD' ? 'ADD' : 'UPDATE' }
      </Button>
    </StyledAddCard>
  );
};

const StyledAddCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px;

  .front,
  .back {
    width: 100%;
  }
`;

const withCurrentUser = graphql(GET_CURRENT_USER, {
  props: ({ data: { currentUser } }) => ({
    currentUser
  })
})

const withAddCardMutation = graphql(ADD_CARD_MUTATION, {
  props: ({ mutate, currentUser }) => ({
    addCard: (user_id, front, back) => {
      mutate({
        variables: { user_id, front, back },
        refetchQueries: [
          {
            query: GET_ALL_CARDS_QUERY,
            variables: { user_id }
          }
        ]
      })
    }
  })
})

const withUpdateCardMutation = graphql(UPDATE_CARD, {
  props: ({ mutate, currentUser }) => ({
    updateCard: (user_id, card_id, front, back) => {
      mutate({
        variables: { card_id, front, back },
        refetchQueries: [
          {
            query: GET_ALL_CARDS_QUERY,
            variables: { user_id }
          }
        ]
      })
    }
  })
})

export default compose(
  withCurrentUser,
  withAddCardMutation,
  withUpdateCardMutation,
)(AddCard);


import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { ADD_CARD_MUTATION, GET_ALL_CARDS_QUERY } from 'queries';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const AddCard = ({ addCard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  function onClickHandler(e) {
    e.preventDefault();

    if (front.trim() !== '' && back.trim() !== '') {
      addCard(1, front, back);
      
      setFront('');
      setBack('');
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
        Add
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

const withAddCardMutation = graphql(ADD_CARD_MUTATION, {
  props: ({ mutate }) => ({
    addCard: (user_id, front, back) => {
      mutate({
        variables: { user_id, front, back },
        refetchQueries: [
          {
            query: GET_ALL_CARDS_QUERY,
            variables: { user_id: 1 }
          }
        ]
      })
    }
  })
})

export default withAddCardMutation(AddCard);


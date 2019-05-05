import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { ADD_CARD_MUTATION, GET_ALL_CARDS_QUERY } from 'queries';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const AddCard = ({ addCard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  function onClickHandler(e) {
    e.preventDefault();

    addCard(1, front, back);

    setFront('');
    setBack('');
  }

  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Front"
        multiline
        rowsMax="6"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Back"
        multiline
        rowsMax="10"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Divider />
      <Button
        variant="contained"
        color="primary"
        onClick={onClickHandler}
      >
        Add
      </Button>
    </div>
  );
};

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


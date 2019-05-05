import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { DELETE_CARD_MUTATION, GET_ALL_CARDS_QUERY } from 'queries';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { colors } from 'constant';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';

const StyledList = styled(({ className, children, ...rest }) => (
  <List className={className} {...rest}>
    {children}
  </List>
))`
  width: 100%;

  &:focus {
    outline: none;
  }

  .check-circle-icon {
    color: green;
  }
`

const Card = ({ deleteCard, data : { card_id, user_id, front, back, creation_date, modification_date, is_studied, is_favorite } }) => {
  return (
    <StyledList>
      <ListItem>
        <ListItemText
          primary={front}
          secondary={back}
        />
        {/* <Button
          variant="contained"
          color={is_done ? 'secondary' : 'primary'}
          onClick={() => toggleTodo(todo_id, !is_done)}
        >
          { is_done ? 'Mark as not done' : 'Mark as done' }
        </Button> */}
        <IconButton
          aria-label="Delete"
          onClick={() => deleteCard(card_id)}
        >
          <DeleteIcon
            color="primary"
          />
        </IconButton>
      </ListItem>
      <hr />
    </StyledList>
  );
}

const withDeleteCardMutation = graphql(DELETE_CARD_MUTATION, {
  props: ({ mutate }) => ({
    deleteCard: (card_id) => {
      mutate({
        variables: { card_id },
        refetchQueries: [
          {
            query: GET_ALL_CARDS_QUERY,
            variables: { user_id: 1 }
          }
        ]
      })
    }
  })
});

export default withDeleteCardMutation(Card);
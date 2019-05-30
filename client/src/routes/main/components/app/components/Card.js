import React from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { DELETE_CARD_MUTATION, GET_ALL_CARDS_QUERY } from 'queries';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledList = styled(({ className, children, ...rest }) => (
  <List className={className} {...rest}>
    {children}
  </List>
))`
  width: 100%;

  .list-item-text {
    > p, > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

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
          className="list-item-text"
        />
        <IconButton
          aria-label="Delete"
          onClick={() => deleteCard(card_id, user_id)}
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
    deleteCard: (card_id, user_id) => {
      mutate({
        variables: { card_id },
        refetchQueries: [
          {
            query: GET_ALL_CARDS_QUERY,
            variables: { user_id }
          }
        ]
      })
    }
  })
});

export default compose(
  withDeleteCardMutation
)(Card);

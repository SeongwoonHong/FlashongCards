import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';

const StyledList = styled(({ className, children, ...rest }) => (
  <List className={className} {...rest}>
    {children}
  </List>
))`
  .check-circle-icon {
    color: green;
  }
`

const Todo = ({ toggleTodo, removeTodo, data : { todo_id, title, is_done, creation_date } }) => {
  return (
    <StyledList>
      <ListItem>
        <ListItemText
          primary={title}
          secondary={<Moment unix format="YYYY/MM/DD">{creation_date / 1000}</Moment>}
        />
        <Button
          variant="contained"
          color={is_done ? 'secondary' : 'primary'}
          onClick={() => toggleTodo(todo_id, !is_done)}
        >
          { is_done ? 'Mark as not done' : 'Mark as done' }
        </Button>
        <IconButton
          aria-label="Delete"
          onClick={() => removeTodo(todo_id)}
        >
          <DeleteIcon
            color="primary"
          />
        </IconButton>
      </ListItem>
    </StyledList>
  );
}

export default Todo;

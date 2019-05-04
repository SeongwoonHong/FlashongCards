// import React, { useState } from 'react';
// import { graphql } from 'react-apollo';
// import { ADD_TODO_MUTATION, GET_TODO_BY_USER_QUERY } from 'queries';
// import styled from 'styled-components';
// import InputBase from '@material-ui/core/InputBase';
// import { colors } from 'constant';

// const AddTodo = ({ addTodo, placeholder, visible }) => {
//   const [title, setTitle] = useState('');

//   if (!visible) {
//     return null;
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     if (title.trim() === '') {
//       return null;
//     }

//     addTodo(title);

//     return setTitle('');
//   }

//   return (
//     <StyledAddTodo>
//       <form onSubmit={submitHandler}>
//         <InputBase
//           placeholder={placeholder}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{width: '100%'}}
//         />
//       </form>
//     </StyledAddTodo>
//   );
// };

// const withAddTodoMutation = graphql(ADD_TODO_MUTATION, {
//   props: ({ mutate }) => ({
//     addTodo: (title) => {
//       mutate({
//         variables: { title, user_id: 1 }, // for now, it's hard coded as 1
//         refetchQueries: [{ query: GET_TODO_BY_USER_QUERY, variables: { user_id: 1 } }]
//       })
//     }
//   })
// })

// export default withAddTodoMutation(AddTodo);

// const StyledAddTodo = styled.div`
//   border-radius: 25px;
//   padding: 10px 20px;
//   width: 200px;
//   margin: 20px auto;
//   background-color: ${colors.white};

//   input {
//     width: 100%;
//   }
// `;

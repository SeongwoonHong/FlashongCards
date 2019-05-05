import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { GET_ALL_CARDS_QUERY, DELETE_CARD_MUTATION } from 'queries';
import Card from './Card';

const StyledCardList = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const CardList = ({ cards, removeCard, loading }) => {
  if (loading) {
    return null;
  }

  return (
    <StyledCardList>
      {
        cards.map((card) => {
          return (
            <Card
              data={card}
              key={card.card_id}
              removeCard={(id) => removeCard(card.card_id)}
            />
          );
        })
      }
    </StyledCardList>
  );
};

// const withGetCardList = graphql(GET_ALL_CARDS_QUERY, {
//   options: (props) => ({
//     variables: {
//       user_id: 1, // for now it's hard coded
//     },
//   }),
//   props: ({ data: { cards, loading } }) => ({
//     cards,
//     loading,
//   })
// })

const withDeleteCardList = graphql(DELETE_CARD_MUTATION, {
  props: ({ mutate }) => ({
    removeCard: (card_id) => {
      mutate({
        variables: {
          card_id
        },
        // refetchQueries: [
        //   {
        //     query: GET_ALL_CARDS_QUERY,
        //     variables: {
        //       user_id: 1
        //     }
        //   }
        // ]
      })
    }
  })
});

CardList.propTypes = {
  data: PropTypes.array,
};

export default compose(
  // withGetCardList,
  withDeleteCardList,
)(CardList);

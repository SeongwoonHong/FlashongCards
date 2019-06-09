import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { DELETE_CARD_MUTATION } from 'queries';
import Card from './Card';

const StyledCardList = styled.div`
  margin: 0 auto 50px auto;
  width: 80%;
`;

const CardList = ({ cards, removeCard, loading, setInitialIndex }) => {
  if (loading) {
    return null;
  }

  return (
    <StyledCardList>
      {
        cards.map((card, index) => {
          return (
            <Card
              data={card}
              key={card.card_id}
              index={index}
              removeCard={(id) => removeCard(card.card_id)}
              setInitialIndex={setInitialIndex}
            />
          );
        })
      }
    </StyledCardList>
  );
};

const withDeleteCardList = graphql(DELETE_CARD_MUTATION, {
  props: ({ mutate }) => ({
    removeCard: (card_id) => {
      mutate({
        variables: {
          card_id
        },
      })
    }
  })
});

CardList.propTypes = {
  data: PropTypes.array,
};

export default compose(
  withDeleteCardList,
)(CardList);

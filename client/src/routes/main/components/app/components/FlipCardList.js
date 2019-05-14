import React, { useState } from 'react';
import Slider from 'react-slick';
import { graphql, compose } from 'react-apollo';
import { DELETE_CARD_MUTATION } from 'queries';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FlipCard from './FlipCard';

const FlipCardList = ({
  cards,
  removeCard,
  loading,
  currentUser
}) => {
  const [index, setIndex] = useState(1);

  if (loading) {
    return null;
  }

  function toggleIsFavorite(card_id, is_favorite) {

  }

  function toggleIsStudied(card_id, is_studied) {

  }

  const sliderSettings = {
    infinite: false,
    afterChange: current => setIndex(current + 1),
  };

  return (
    <div>
      <StyledIndex>{`${index} / ${cards.length}`}</StyledIndex>
      <Slider {...sliderSettings}>
        {
          cards.map((card) => {
            return (
              <FlipCard
                {...card}
                key={card.card_id}
                removeCard={(id) => removeCard(card.card_id)}
                toggleIsFavorite={() => toggleIsFavorite(card.card_id, !card.is_favorite)}
                toggleIsStudied={() => toggleIsStudied(card.card_id, !card.is_studied)}
              />
            );
          })
        }
      </Slider>
    </div>
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

const StyledIndex = styled.div`
  text-align: center;
`;

export default compose(
  withDeleteCardList,
)(FlipCardList);

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { graphql, compose } from 'react-apollo';
import { DELETE_CARD_MUTATION, UPDATE_CARD, GET_ALL_CARDS_QUERY } from 'queries';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FlipCard from './FlipCard';
import FilpCardUtils from './FlipCardUtils';

const FlipCardList = ({
  cards,
  removeCard,
  loading,
  currentUser,
  updateCard,
  toggleUpdateCard,
  setEditData,
  setModalMode,
  initialIndex,
  setInitialIndex,
}) => {
  const [index, setIndex] = useState(initialIndex || 1);
  let slider;

  useEffect(() => {
    if (initialIndex !== 1) {
      slider.slickGoTo(initialIndex - 1, true);
    }

    return function initializeInitialIndex() {
      setInitialIndex(1);
    }
  }, [initialIndex, slider, setInitialIndex]);

  if (loading) {
    return null;
  }

  const sliderSettings = {
    infinite: false,
    afterChange: current => setIndex(current + 1),
  };

  return (
    <div>
      <StyledIndex>{`${index} / ${cards.length}`}</StyledIndex>
      <Slider
        {...sliderSettings}
        ref={el => slider = el}
        arrows={false}
      >
        {
          cards.map((card) => {
            return (
              <FlipCard
                {...card}
                key={card.card_id}
                removeCard={(id) => removeCard(card.card_id)}
              />
            );
          })
        }
      </Slider>
      <FilpCardUtils
        toggleIsFavorite={() => updateCard(cards[index - 1].card_id, cards[index - 1].is_studied, !cards[index - 1].is_favorite, currentUser.user_id)}
        toggleIsStudied={() => updateCard(cards[index - 1].card_id, !cards[index - 1].is_studied, cards[index - 1].is_favorite, currentUser.user_id)}
        isStudied={cards[index - 1].is_studied}
        isFavorite={cards[index - 1].is_favorite}
        toggleUpdateCard={() => {
          setEditData({
            ...cards[index - 1]
          });
          setModalMode('EDIT_CARD');
          toggleUpdateCard();
        }}
      />
    </div>
  );
};

const withUpdateCard = graphql(UPDATE_CARD, {
  props: ({ mutate }) => ({
    updateCard: (card_id, is_studied, is_favorite, user_id) => {
      mutate({
        variables: {
          card_id,
          is_studied,
          is_favorite,
        },
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
  withUpdateCard
)(FlipCardList);

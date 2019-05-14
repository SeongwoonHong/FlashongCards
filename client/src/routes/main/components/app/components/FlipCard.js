import React, { useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { colors } from 'constant';
import { UPDATE_CARD } from 'queries';
import FilpCardUtils from './FlipCardUtils';

const FlipCard = ({
  card_id,
  front, back,
  creation_date,
  modification_Date,
  is_studied,
  is_favorite,
  toggleIsFavorite,
  toggleIsStudied
}) => {
  const [isFliped, setIsFliped] = useState(false);

  return (
    <StyledFlipCard
      onClick={() => setIsFliped(!isFliped)}
      className={cx('card--container', { flip: isFliped })}
    >
      <div className="card-flipper">
        <div className="side front">
          {front}
        </div>
        <div className="side back">
          {back}
        </div>
      </div>
      <FilpCardUtils
        toggleIsFavorite={toggleIsFavorite}
        toggleIsStudied={toggleIsStudied}
        isStudied={is_studied}
        isFavorite={is_favorite}
      />
    </StyledFlipCard>
  );
};

export default FlipCard;

const StyledFlipCard = styled.div`
  perspective: 1000px;
  height: 500px;

  &.flip .card-flipper {
    transform: rotateY(180deg); 
  }

  .card-flipper {
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.5s ease-out;
  }

  .side {
    white-space: pre-wrap;
    backface-visibility: hidden;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    height: 500px;
    width: 350px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    color: ${colors.black};
    background-color: ${colors.white};
    padding: 10px;
    
    &.front {
      z-index: 2;
      transform: translateX(-50%) rotateY(0deg);
    }
    
    &.back {
      transform: translateX(-50%) rotateY(180deg); 
    }
  }
`;

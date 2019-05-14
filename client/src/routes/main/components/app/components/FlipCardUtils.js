import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import styled from 'styled-components';
import cx from 'classnames';

const FlipCardUtils = ({
  checkIsFavorite,
  checkIsStudied,
  isStudied,
  isFavorite
}) => {
  return (
    <StyledFlipCardUtils>
      <StarIcon
        onClick={checkIsFavorite}
        className={cx('favorite', { active: isFavorite })}
      />
      <CheckIcon
        onClick={checkIsStudied}
        className={cx({ active: isStudied })}
      />
    </StyledFlipCardUtils>
  );
};

const StyledFlipCardUtils = styled.div`
  text-align: center;
  margin-top: 20px;
  
  .active {
    color: green;    
  }

  .favorite {
    margin-right: 50px;

    &.active {
      color: yellow;
    }
  }
`;

export default FlipCardUtils;

import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/EditOutlined';
import styled from 'styled-components';
import cx from 'classnames';

const FlipCardUtils = ({
  toggleIsFavorite,
  toggleIsStudied,
  isStudied,
  isFavorite,
  toggleUpdateCard,
}) => {
  return (
    <StyledFlipCardUtils>
      <StarIcon
        onClick={toggleIsFavorite}
        className={cx('favorite', { active: isFavorite })}
      />
      <CheckIcon
        onClick={toggleIsStudied}
        className={cx({ active: isStudied })}
      />
      <EditIcon
        onClick={toggleUpdateCard}
      />
    </StyledFlipCardUtils>
  );
};

const StyledFlipCardUtils = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  
  .active {
    color: green;    
  }

  .favorite {
    &.active {
      color: yellow;
    }
  }
`;

export default FlipCardUtils;

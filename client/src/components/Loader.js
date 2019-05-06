import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constant';

const Loader = props => {
  return (
    <StyledLoaderContainer>
      <StyledLoader />
    </StyledLoaderContainer>
  );
};

Loader.propTypes = {
  
};

const StyledLoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: ${colors.white};
  opacity: 0.6;
  position: absolute;
`;

const StyledLoader = styled.div`
  height: 40px;
  width: 40px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50% ,-50%);

  &:before,
  &:after {
    content: "";
    height: 40px;
    width: 40px;
    border: 8px solid ${colors.primary};
    border-radius: 10px;
    position: absolute;
    top: 0;
  }
  
  &:before {
    animation: animate 2s infinite linear;
  }
  
  &:after {
    animation: animate2 2s infinite linear;
  }
}

@keyframes animate {
  100% {
    transform: rotate(180deg) skew(360deg);
  }
}

@keyframes animate2 {
  100% {
    transform: rotate(-180deg) skew(-360deg);
  }
`;

export default Loader;

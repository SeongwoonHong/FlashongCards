import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ onClick, className, style, children }) => {
  return (
    <StyledButton
      onClick={onClick}
      className={className}
      style={style}
    >
      <div className="button-text">{children}</div>
    </StyledButton>
  );
};

Button.propTypes = {
  
};

const StyledButton = styled.div`
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  width: 100%;

  .button-text {
    background-color: #00cc99;
    border: 2px solid #fff;
    padding: 10px 0px;
    border-radius: 50px;
    color: #fff;
  }
`;

export default Button;

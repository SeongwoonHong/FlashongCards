import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBox = ({
  children,
  ...rest
}) => {
  return (
    <StyledInputBox {...rest}>
      {children}
    </StyledInputBox>
  );
};

InputBox.propTypes = {
  borderTopLeftRadius: PropTypes.string,
  borderTopRightRadius: PropTypes.string,
  borderBottomLefttRadius: PropTypes.string,
  borderBottomRightRadius: PropTypes.string,
  inputBorderColor: PropTypes.string,
};

const StyledInputBox = styled.div`
  background-color: ${props => props.backgroundColor};
  position: relative;
  height: 100px;
  width: 60%;
  margin: 0 auto;
  border-top-left-radius: ${props => props.borderTopLeftRadius || 'initial'};
  border-top-right-radius: ${props => props.borderTopRightRadius || 'initial'};
  border-bottom-left-radius: ${props => props.borderBottomLefttRadius || 'initial'};
  border-bottom-right-radius: ${props => props.borderBottomRightRadius || 'initial'};

  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    border-color: ${props => `${props.inputBorderColor || 'white'} transparent transparent transparent`};
    top: 6.25em;
    left: 50%;
    margin-left: -4px;
    z-index: 1;
  }

  @media (max-width: 550px) {
    width: 80%;
  }
`;

export default InputBox;

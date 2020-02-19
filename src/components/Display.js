import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

const Div = styled.div`
  ${tw`text-center rounded text-4xl tracking-wider`};
  grid-column: 1 / -1;
  display: grid;
  min-height: 10vh;
  color: #f2f2f2;
  border: 2px solid black;
  margin-bottom: 5px;
  word-break: break-all;
  .calc {
    justify-self: end;
    padding-right: 0.5rem;
    align-self: end;
  }
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const EquationDiv = styled.div`
  ${tw`text-sm p-1`}

  justify-self: start;
  align-self: start;
  display: flex;
`;

const Display = props => {
  const checkTotal = () => {
    let result;
    if (Number.isNaN(props.states.total)) {
      result = 'Error';
    } else {
      result = props.states.total;
    }
    return result;
  };
  return (
    <Div>
      <EquationDiv className="mango">{props.states.fullEquation}</EquationDiv>
      <span className="calc">
        {props.states.total === 0 &&
        (props.states.currNum || props.states.operators[0] === '-')
          ? null
          : checkTotal()}
        {checkTotal() === 'Error' ? null : props.states.operators[0]}
        {props.states.currNum}
      </span>
    </Div>
  );
};

Display.propTypes = {
  states: PropTypes.object.isRequired
};
export default Display;

import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

const Div = styled.div`
  ${tw`bg-gray-300 text-center rounded text-2xl tracking-wider`};
  grid-column: 1 / -1;
  min-height: 20vh;
  display: grid;
  word-break: break-all;
  .calc {
    justify-self: end;
    padding-right: 0.5rem;
  }
`;

const EquationDiv = styled.div`
  ${tw`text-sm p-1`}
  min-height: 5vh;
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

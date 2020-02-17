import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes, { number } from 'prop-types';

const Div = styled.div`
  ${tw`bg-gray-300 text-center rounded text-2xl tracking-wider`};
  grid-column: 1 / -1;
  height: 25vh;
  overflow: hidden;
  display: grid;
  /* letter-spacing: 2px; */
`;

const EquationDiv = styled.div`
  ${tw`text-sm p-1`}
  justify-self: start;
  align-self: start;
`;

const HiddenDiv = styled.div`
  display: ${props => (props.states.currNumm ? 'hidden' : 'inline-block')};
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
      <EquationDiv>{props.states.fullEquation}</EquationDiv>
      <span>
        {props.states.total === 0 && props.states.currNum ? null : checkTotal()}
        {props.states.operators[0]}
        {props.states.currNum}
      </span>
    </Div>
  );
};

Display.propTypes = {
  states: PropTypes.object.isRequired
};
export default Display;

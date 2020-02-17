import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes, { number } from 'prop-types';

const Div = styled.div`
  ${tw`bg-gray-300 text-center p-10 rounded`};
  grid-column: 1 / -1;
`;

const Display = props => {
  const checkTotal = () => {
    let result;
    if (props.states.total === null && props.states.currNum === '') {
      result = 0;
    }
    if (Number.isNaN(props.states.total)) {
      result = 'Error';
    } else {
      result = props.states.total;
    }
    return result;
  };
  return (
    <Div>
      <div>{props.states.fullEquation}</div>
      <span>{checkTotal()}</span>
      <span>{props.states.operators[0]}</span>
      <span>{props.states.currNum}</span>
    </Div>
  );
};

Display.propTypes = {
  states: PropTypes.object.isRequired
};
export default Display;

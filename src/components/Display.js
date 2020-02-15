import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

const Div = styled.div`
  ${tw`bg-gray-300 text-center p-10 rounded`};
  grid-column: 1 / -1;
`;

const Display = props => {
  return (
    <Div>
      <div>{props.states.fullEquation}</div>
      <span>{props.states.total}</span>
      <span>{props.states.operators[0]}</span>
      <span>{props.states.currNum}</span>
    </Div>
  );
};

Display.propTypes = {
  states: PropTypes.object.isRequired
};
export default Display;

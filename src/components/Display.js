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
  text-align: left;
  display: flex;
`;

const Display = props => {
  return (
    <Div>
      <EquationDiv>{props.states.fullEquation.join('')}</EquationDiv>
      <span className="calc">
        {props.states.total === 0 && props.states.nextNum[0]
          ? null
          : props.states.total}
        {props.states.operators[0]}
        {props.states.nextNum}
      </span>
    </Div>
  );
};

Display.propTypes = {
  states: PropTypes.object.isRequired
};
export default Display;

import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

//STYLING

const KeypadContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.1rem;
`;
const DigitPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.1rem;
`;
const OperatorPad = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.1rem;
`;

const Digit = styled.div`
  ${tw`text-center bg-blue-200 p-5 rounded`};
  display: grid;
  align-content: center;
`;
const Digit0 = styled.div`
  grid-column: 1 / -1;
  ${tw`text-center bg-blue-200 p-5 border-none rounded`};
  display: grid;
  align-content: center;
`;

const Operator = styled.div`
  ${tw`text-center bg-orange-200 rounded`};
  display: grid;
  align-content: center;
`;

//COMPONENT

const Keypad = ({ states }) => {
  //DATA
  const keypad = {
    digits: {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
      zero: '0'
    },
    operators: {
      decimal: '.',
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷',
      equals: '=',
      reset: 'AC',
      delete: '←'
    }
  };

  const {
    total,
    operators,
    currNum,
    addToCurr,
    addOperator,
    removeOperator,
    setTotal,
    setCurrNum,
    setOperators,
    calculate,
    fullEquation,
    addToEquation,
    setFullEquation,
    removeFromEquation
  } = states;

  const opCheck = '+-÷×';

  //METHODS
  const doCalculation = () => {
    if (total && currNum) {
      const result = calculate();
      setTotal(result);
      setCurrNum('');
    }
  };
  const digitHandler = digit => {
    if (!total || (total && operators.length === 1)) {
      addToCurr(digit);
      addToEquation(digit);
    }
  };
  const operatorHandler = operator => {
    const check = fullEquation.slice(-1);
    if (!opCheck.includes(check)) {
      addToEquation(operator);
    }
    if (currNum || (total && operators.length === 0)) {
      addOperator(operator);
    }
    if (!total && currNum) {
      setTotal(parseFloat(currNum));
      setCurrNum('');
    }
    doCalculation();
  };

  const equalsHandler = () => {
    doCalculation();
    removeOperator();
    if (!currNum) {
      removeFromEquation();
    }
  };

  const resetHandler = () => {
    setTotal(null);
    setCurrNum('');
    setOperators([]);
    setFullEquation('');
  };

  const deleteHandler = () => {
    //empty
  };
  return (
    <KeypadContainer>
      <DigitPad>
        <Digit onClick={() => digitHandler(keypad.digits.seven)}>
          {keypad.digits.seven}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.eight)}>
          {keypad.digits.eight}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.nine)}>
          {keypad.digits.nine}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.four)}>
          {keypad.digits.four}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.five)}>
          {keypad.digits.five}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.six)}>
          {keypad.digits.six}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.one)}>
          {keypad.digits.one}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.two)}>
          {keypad.digits.two}
        </Digit>
        <Digit onClick={() => digitHandler(keypad.digits.three)}>
          {keypad.digits.three}
        </Digit>
        <Digit0 onClick={() => digitHandler(keypad.digits.zero)}>
          {keypad.digits.zero}
        </Digit0>
      </DigitPad>
      <OperatorPad>
        <Operator onClick={resetHandler}>{keypad.operators.reset}</Operator>
        <Operator onClick={deleteHandler}>{keypad.operators.delete}</Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.add)}>
          {keypad.operators.add}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.subtract)}>
          {keypad.operators.subtract}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.multiply)}>
          {keypad.operators.multiply}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.divide)}>
          {keypad.operators.divide}
        </Operator>
        <Operator onClick={() => digitHandler(keypad.operators.decimal)}>
          {keypad.operators.decimal}
        </Operator>
        <Operator onClick={equalsHandler}>{keypad.operators.equals}</Operator>
      </OperatorPad>
    </KeypadContainer>
  );
};

Keypad.propTypes = {
  states: PropTypes.object
};
export default Keypad;

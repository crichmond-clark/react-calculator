import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';
import { setConstantValue, isGetAccessor } from 'typescript';

//STYLING

const KeypadContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.22rem;
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
  ${tw`text-center rounded text-xl`};
  display: grid;
  align-content: center;
  background: #333333;
  color: #f2f2f2;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const Digit0 = styled.div`
  grid-column: 1 / -1;
  ${tw`text-center border-none rounded text-xl`};
  display: grid;
  align-content: center;
  background: #333333;
  color: #f2f2f2;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Operator = styled.div`
  ${tw`text-center rounded text-xl`};
  display: grid;
  align-content: center;
  background: #fc9f40;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
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
    nextNum,
    fullEquation,
    setTotal,
    setNextNum,
    setFullEquation,
    addOperator,
    removeOperator,
    addToNext,
    removeFromNext,
    addToEquation,
    addNextNumToEquation,
    removeFromEquation,
    calculate,
    reset
  } = states;
  const checkNum = !Number.isNaN(parseFloat(nextNum.join('')));
  //METHODS
  const setInitialTotal = operator => {
    setTotal(parseFloat(nextNum.join('')));
    setNextNum([]);
    addOperator(operator);
  };

  const addFirstNumToEquation = digit => {
    if (total === 0 && !operators[0]) {
      addToEquation(digit);
    }
  };
  const addFirstSubtractToEquation = subtract => {
    if (total === 0 && !operators[0]) {
      if (fullEquation.length === 0) {
        addToEquation(subtract);
      }
    }
  };

  //handlers
  const digitHandler = digit => {
    addFirstNumToEquation(digit);
    addToNext(digit);
    if (total !== 0 && !operators[0]) {
      setTotal(0);
      setFullEquation([digit]);
      addToNext(digit);
    }
  };

  const decimalHandler = decimal => {
    addFirstNumToEquation(decimal);
    if (fullEquation.length === 0) {
      setFullEquation(['0', decimal]);
    }
    if (!nextNum.includes(decimal)) {
      addToNext(decimal);
    }
  };
  const operatorHandler = operator => {
    if (total === 0 && checkNum) {
      setInitialTotal(operator);
    } else if (total > 0 && !operators[0]) {
      addOperator(operator);
    } else if (checkNum) {
      addOperator(operator);
      calculate();
    }
  };

  const subtractHandler = subtract => {
    addFirstSubtractToEquation(subtract);
    if ((total === 0 && !nextNum[0]) || (total !== 0 && operators[0])) {
      if (!nextNum.includes('-')) {
        addToNext(subtract);
      }
    }
    if (total === 0 && checkNum) {
      setInitialTotal(subtract);
    } else if (total !== 0 && operators.length === 0) {
      addOperator(subtract);
    } else if (checkNum) {
      addOperator(subtract);
      calculate();
    }
  };

  const equalsHandler = () => {
    if (checkNum) {
      calculate();
      removeOperator();
    }
  };

  const resetHandler = () => {
    reset();
  };

  const deleteHandler = () => {
    fullEquation.forEach(element => {
      if (element.length === 1 && total === 0) {
        removeFromEquation(1);
      }
    });
    if (nextNum.length > 0) {
      removeFromNext(1);
    } else if (operators.length === 1) {
      removeOperator();
    }
  };
  const useKey = (key, cb) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
      callbackRef.current = cb;
    });

    useEffect(() => {
      const handle = e => {
        e.preventDefault();
        if (e.key === key) {
          callbackRef.current(e);
        }
      };

      window.addEventListener('keydown', handle);
      return () => window.removeEventListener('keydown', handle);
    }, [key]);
  };

  //KEYPRESS EVENTS
  //Digits
  useKey('7', () => digitHandler('7'));
  useKey('8', () => digitHandler('8'));
  useKey('9', () => digitHandler('9'));
  useKey('4', () => digitHandler('4'));
  useKey('5', () => digitHandler('5'));
  useKey('6', () => digitHandler('6'));
  useKey('1', () => digitHandler('1'));
  useKey('2', () => digitHandler('2'));
  useKey('3', () => digitHandler('3'));
  useKey('0', () => digitHandler('0'));
  useKey('.', () => decimalHandler('.'));
  //Operators
  useKey(keypad.operators.add, () => operatorHandler(keypad.operators.add));
  useKey(keypad.operators.subtract, () =>
    subtractHandler(keypad.operators.subtract)
  );
  useKey(keypad.operators.divide, () =>
    operatorHandler(keypad.operators.divide)
  );
  useKey('/', () => operatorHandler(keypad.operators.divide));
  //multiplication keypress
  useKey('*', () => operatorHandler(keypad.operators.multiply));
  useKey('X', () => operatorHandler(keypad.operators.multiply));
  useKey('x', () => operatorHandler(keypad.operators.multiply));
  //equals keypress
  useKey(keypad.operators.equals, equalsHandler);
  useKey('Enter', equalsHandler);
  //delete keypress
  useKey('Backspace', deleteHandler);
  //reset keypress
  useKey('F5', resetHandler);

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
        <Operator onClick={() => subtractHandler(keypad.operators.subtract)}>
          {keypad.operators.subtract}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.multiply)}>
          {keypad.operators.multiply}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.divide)}>
          {keypad.operators.divide}
        </Operator>
        <Operator onClick={() => decimalHandler(keypad.operators.decimal)}>
          {keypad.operators.decimal}
        </Operator>

        <Operator onClick={equalsHandler}>{keypad.operators.equals}</Operator>
      </OperatorPad>
    </KeypadContainer>
  );
};

Keypad.propTypes = {
  states: PropTypes.object.isRequired
};
export default Keypad;

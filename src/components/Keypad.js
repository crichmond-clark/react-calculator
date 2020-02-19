import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

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
    currNum,
    addToCurr,
    addOperator,
    removeOperator,
    setTotal,
    setCurrNum,
    calculate,
    fullEquation,
    addToEquation,
    removeFromEquation,
    removeFromCurr,
    getLastItemEquation,
    getLastItemCurr,
    reset
  } = states;

  const opCheck = '+-÷×';
  //METHODS

  const doCalculation = () => {
    if ((total && Number.isNaN(parseFloat(currNum)) === false) || total === 0) {
      const result = calculate();
      setTotal(result);
      setCurrNum('');
    }
    setCurrNum('');
  };

  const checkEquation = () => {
    const check = fullEquation.slice(-1);
    if (!opCheck.includes(check)) {
      return true;
    }
  };

  const digitHandler = digit => {
    if (!total || (total && operators.length === 1)) {
      addToCurr(digit);
      addToEquation(digit);
    }
  };

  const decimalHandler = () => {
    if (getLastItemCurr() !== '.') {
      addToCurr(keypad.operators.decimal);
      addToEquation(keypad.operators.decimal);
    }
  };
  const operatorHandler = operator => {
    if (operators[0] && operator === '-') {
      addOperator(operator);
      addToEquation(operator);
      doCalculation();
      if (!currNum.includes('-')) {
        if (!currNum) {
          addToCurr(operator);
          addToEquation(operator);
        }
      }
    } else {
      if (getLastItemEquation() === '.' && getLastItemCurr() === '.') {
        removeFromEquation(1);
      }
      if (checkEquation()) {
        addToEquation(operator);
      }
      if (total === 0 || fullEquation === '') {
        addOperator(operator);
        addToEquation(operator);
      }
      if (
        (currNum && getLastItemCurr() !== '.') ||
        (total && operators.length === 0)
      ) {
        addOperator(operator);
      }
      if (!total && currNum) {
        setTotal(parseFloat(currNum));
        setCurrNum('');
      }
      if (getLastItemCurr() === '.' && currNum.length === 1) {
        removeFromEquation(1);
        removeFromCurr();
      } else {
        doCalculation();
      }
    }
  };

  const equalsHandler = () => {
    doCalculation();
    removeOperator();
    if (getLastItemEquation() === '.') {
      removeFromEquation(1);
    }
    if (operators[0] && total && !currNum) {
      const num = currNum.length + 1;
      removeFromEquation(num);
    }
  };

  const resetHandler = () => {
    reset();
  };

  const deleteHandler = () => {
    if (!currNum && operators[0] && !currNum) {
      removeOperator();
      removeFromEquation(1);
    }
    if (total === 0) {
      removeFromCurr();
      removeFromEquation(1);
    }
    if (total && currNum && operators[0]) {
      removeFromCurr();
      removeFromEquation(1);
    }
    if (currNum === '.') {
      removeFromCurr();
      removeFromEquation(1);
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
  useKey('.', decimalHandler);
  //Operators
  useKey(keypad.operators.add, () => operatorHandler(keypad.operators.add));
  useKey(keypad.operators.subtract, () =>
    operatorHandler(keypad.operators.subtract)
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
        <Operator onClick={() => operatorHandler(keypad.operators.subtract)}>
          {keypad.operators.subtract}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.multiply)}>
          {keypad.operators.multiply}
        </Operator>
        <Operator onClick={() => operatorHandler(keypad.operators.divide)}>
          {keypad.operators.divide}
        </Operator>
        <Operator onClick={decimalHandler}>{keypad.operators.decimal}</Operator>
        <Operator onClick={equalsHandler}>{keypad.operators.equals}</Operator>
      </OperatorPad>
    </KeypadContainer>
  );
};

Keypad.propTypes = {
  states: PropTypes.object.isRequired
};
export default Keypad;

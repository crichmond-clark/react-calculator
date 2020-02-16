import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import Display from './Display';
import Keypad from './Keypad';

const Div = styled.div`
  ${tw`text-gray-600`};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column: 2 / 3;
  gap: 0.1rem;
  font-family: 'Varela Round', sans-serif;
`;

const Calculator = () => {
  const [total, setTotal] = useState(null);
  const [operators, setOperators] = useState([]);
  const [currNum, setCurrNum] = useState('');
  const [fullEquation, setFullEquation] = useState('');
  const [tempEquation, setTempEquation] = useState('');

  const addToCurr = item => {
    setCurrNum(`${currNum + item}`);
  };
  const addToEquation = item => {
    setFullEquation(`${fullEquation + item}`);
  };

  const removeFromEquation = () => {
    const newEquation = fullEquation.slice(0, -1);
    setFullEquation(newEquation);
  };

  const addOperator = operator => {
    setOperators([...operators, operator]);
  };

  const add = (num1, num2) => num1 + num2;
  const subtract = (num1, num2) => num1 - num2;
  const multiply = (num1, num2) => num1 * num2;
  const divide = (num1, num2) => num1 / num2;
  const operate = useCallback((operation, num1, num2) => {
    switch (operation) {
      case '+':
        return add(num1, num2);
      case '-':
        return subtract(num1, num2);
      case '÷':
        return divide(num1, num2);
      case '×':
        return multiply(num1, num2);
      default:
        console.log('sorry invalid operation');
        break;
    }
  }, []);

  const removeOperator = useCallback(() => {
    const tempOps = [...operators];
    tempOps.shift();
    setOperators([...tempOps]);
  }, [operators]);

  const calculate = () => {
    const result = operate(operators[0], total, parseFloat(currNum));
    return result;
  };

  useEffect(() => {
    if (operators.length > 1) {
      removeOperator();
    }
  }, [operators, removeOperator]);

  const displayStates = {
    total,
    currNum,
    operators,
    fullEquation
  };
  const KeypadStates = {
    total,
    currNum,
    operators,
    fullEquation,
    addOperator,
    removeOperator,
    setTotal,
    setCurrNum,
    setOperators,
    addToCurr,
    calculate,
    addToEquation,
    setFullEquation,
    removeFromEquation
  };

  return (
    <Div>
      <Display states={displayStates} />
      <Keypad states={KeypadStates} />
    </Div>
  );
};

export default Calculator;
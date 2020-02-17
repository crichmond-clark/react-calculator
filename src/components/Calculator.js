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
  const [total, setTotal] = useState(0);
  const [operators, setOperators] = useState([]);
  const [currNum, setCurrNum] = useState('');
  const [fullEquation, setFullEquation] = useState('');
  const regex = /.*\..*\..*/;
  const addToCurr = item => {
    setCurrNum(`${currNum + item}`);
  };
  const removeFromCurr = useCallback(() => {
    const newNum = currNum.slice(0, -1);
    setCurrNum(`${newNum}`);
  }, [currNum]);

  const getLastItemCurr = () => {
    const check = currNum.slice(-1);
    return check;
  };
  const addToEquation = item => {
    setFullEquation(`${fullEquation + item}`);
  };

  const removeFromEquation = useCallback(
    numOfChars => {
      const newEquation = fullEquation.slice(0, -numOfChars);
      setFullEquation(newEquation);
    },
    [fullEquation]
  );

  const getLastItemEquation = () => {
    const check = fullEquation.slice(-1);
    return check;
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
        break;
    }
  }, []);

  const removeOperator = useCallback(() => {
    const tempOps = [...operators];
    tempOps.shift();
    setOperators([...tempOps]);
  }, [operators]);

  const calculate = () => {
    let result = operate(operators[0], total, parseFloat(currNum));
    result = Math.round(result);
    return result;
  };

  const reset = () => {
    setTotal(null);
    setCurrNum('');
    setOperators([]);
    setFullEquation('');
  };
  useEffect(() => {
    if (operators.length > 1) {
      removeOperator();
    }
  }, [operators, removeOperator]);

  const displayStates = {
    total,
    setTotal,
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
    removeFromEquation,
    removeFromCurr,
    getLastItemEquation,
    getLastItemCurr,
    reset
  };

  return (
    <Div>
      <Display states={displayStates} />
      <Keypad states={KeypadStates} />
    </Div>
  );
};

export default Calculator;

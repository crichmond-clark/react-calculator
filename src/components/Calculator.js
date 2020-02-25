import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import Display from './Display';
import Keypad from './Keypad';

const Div = styled.div`
  ${tw`p-1`};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  gap: 0.1rem;
  font-family: 'Varela Round', sans-serif;
  border: 3px solid black;
  border-radius: 5px;
  height: 90vh;
  @media (max-width: 768px) {
    height: 95vh;
  }
`;

const Calculator = () => {
  const [total, setTotal] = useState(0);
  const [operators, setOperators] = useState([]);
  const [nextNum, setNextNum] = useState([]);
  const [fullEquation, setFullEquation] = useState([]);

  const addOperator = operator => {
    setOperators([...operators, operator]);
  };
  const removeOperator = useCallback(() => {
    const tempOps = [...operators];
    tempOps.shift();
    setOperators([...tempOps]);
  }, [operators]);
  const addToNext = item => {
    setNextNum([...nextNum, item]);
  };
  const removeFromNext = num => {
    const newNext = nextNum.slice(0, -num);
    setNextNum([...newNext]);
  };

  const addToEquation = item => {
    setFullEquation([...fullEquation, item]);
  };
  const addNextNumToEquation = () => {
    let tempNum = [...nextNum];
    if (tempNum.slice(-1)[0] === '.') {
      tempNum = tempNum.slice(0, -1);
    } else if (tempNum.slice(0, 1)[0] === '.') {
      tempNum = ['0', '.', tempNum.slice(-1)[0]];
    }

    const equationItem = `${operators[0] + tempNum.join('')}`;
    setFullEquation([...fullEquation, equationItem]);
  };

  const removeFromEquation = num => {
    const newEquation = fullEquation.slice(0, -num);
    setFullEquation([...newEquation]);
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

  const calculate = useCallback(() => {
    const next = parseFloat(nextNum.join(''));
    const result = parseFloat(operate(operators[0], total, next).toFixed(2));
    if (result === 0) {
      reset();
    } else {
      addNextNumToEquation();
      setTotal(result);
      setNextNum([]);
    }
  }, [
    nextNum,
    setTotal,
    total,
    removeOperator,
    setNextNum,
    operate,
    operators,
    addNextNumToEquation
  ]);

  const reset = () => {
    setTotal(0);
    setNextNum([]);
    setOperators([]);
    setFullEquation([]);
  };
  useEffect(() => {
    if (operators.length > 1) {
      removeOperator();
    }
    if (fullEquation.length > 20) {
      setFullEquation([]);
    }
  }, [operators, removeOperator, calculate]);

  const displayStates = {
    total,
    setTotal,
    nextNum,
    operators,
    fullEquation
  };
  const KeypadStates = {
    total,
    nextNum,
    operators,
    fullEquation,
    setTotal,
    setFullEquation,
    setNextNum,
    addOperator,
    removeOperator,
    addToEquation,
    addNextNumToEquation,
    addToNext,
    removeFromNext,
    removeFromEquation,
    calculate,
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

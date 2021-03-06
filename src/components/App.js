import React from 'react';
import styled from '@emotion/styled';
import Calculator from './Calculator';

const Div = styled.div`
  background: #141518;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr 3fr 1fr;
  height: 95vh;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 5fr 1fr;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const App = () => {
  return (
    <Div>
      <Calculator />
    </Div>
  );
};

export default App;

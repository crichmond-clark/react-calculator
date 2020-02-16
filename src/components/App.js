import React from 'react';
import styled from '@emotion/styled';
import Calculator from './Calculator';

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const App = () => {
  return (
    <Div>
      <Calculator />
    </Div>
  );
};

export default App;
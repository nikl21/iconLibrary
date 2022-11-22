import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  );
}

export default App;

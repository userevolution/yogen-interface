import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  Web3ReactProvider,
} from '@web3-react/core';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import theme from '../src/style/theme';
import getLibrary from '../src/store/library';

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Story />
        </Router>
      </Web3ReactProvider>
    </ChakraProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

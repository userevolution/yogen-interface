import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  Web3ReactProvider,
} from '@web3-react/core';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';

import Home from '../../pages/home';
import Create from '../../pages/create';
import Test from '../../pages/test';
import Proposals from '../../pages/proposals';
import FutureSwaps from '../../pages/futureSwaps';

import theme from '../../style/theme';
import getLibrary from '../../store/library';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create" exact component={Create} />
            <Route path="/test" exact component={Test} />
            <Route path="/proposals" exact component={Proposals} />
            <Route path="/futureswaps" exact component={FutureSwaps} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;

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
import Add from '../../pages/add';
import Create from '../../pages/create';

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
            <Route path="/add" exact component={Add} />
            <Route path="/create" exact component={Create} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;
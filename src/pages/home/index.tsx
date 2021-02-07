import React from 'react';
import {
  useWeb3React,
} from '@web3-react/core';
import {
  Center,
  Text,
} from '@chakra-ui/react';

import Trades from '../trades';

function Home() {
  const {
    account,
  } = useWeb3React();

  return (
    <>
      {account ? (
        <Trades />
      ) : (
        <Center>
          <Text>
            Your wallet is not connected yet. Please connect it to use the dApp.
          </Text>
        </Center>
      )}
    </>
  );
}

export default Home;

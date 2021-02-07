import React from 'react';
import {
  Heading,
  Center,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
} from 'react-router-dom';

import WalletConnector from '../walletConnector';

function Header() {
  return (
    <Flex p={4}>
      <Heading
        as={RouterLink}
        to="/"
        fontSize="18px"
      >
        Conditional Swaps
      </Heading>
      <Spacer />
      <Center>
        <WalletConnector />
      </Center>
    </Flex>
  );
}

export default Header;

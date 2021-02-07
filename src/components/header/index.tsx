import React from 'react';
import {
  Heading,
  Center,
  Flex,
  Spacer,
  Link,
  HStack,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
} from 'react-router-dom';

import WalletConnector from '../walletConnector';

function Header() {
  return (
    <Flex
      p={4}
      marginBottom="3em"
      borderBottomWidth="1px"
      borderBottomColor="#333333"
      borderBottomStyle="solid"
      alignItems="center"
    >
      <HStack spacing="24px">
        <Heading
          as={RouterLink}
          to="/"
          fontSize="18px"
        >
          Yogen
        </Heading>
        <Link
          as={RouterLink}
          to="/create"
          fontWeight="500"
          color="#cccccc"
          _activeLink={{
            color: '#f5f5f5',
            fontWeight: 600,
            textDecoration: 'underlined',
          }}
          _active={{
            color: '#f5f5f5',
            fontWeight: 600,
            textDecoration: 'underlined',
          }}
          _hover={{
            color: '#f5f5f5',
            textDecoration: 'none',
          }}
        >
          Create
        </Link>
        <Link
          as={RouterLink}
          to="/proposals"
          fontWeight="500"
          color="#cccccc"
          _activeLink={{
            color: '#f5f5f5',
            fontWeight: 600,
          }}
          _hover={{
            color: '#f5f5f5',
            textDecoration: 'none',
          }}
        >
          Proposals
        </Link>
      </HStack>
      <Spacer />
      <Center>
        <WalletConnector />
      </Center>
    </Flex>
  );
}

export default Header;

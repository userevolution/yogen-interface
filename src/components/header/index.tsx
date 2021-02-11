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
import {
  useWeb3React,
} from '@web3-react/core';

import WalletConnector from '../walletConnector';

function Header() {
  const {
    account,
  } = useWeb3React();

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
          Create Future Swap
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
          Browse Future Swap Proposals
        </Link>
      </HStack>
      <Spacer />
      <HStack spacing="24px">
        {account && (
          <>
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
              My Future Swap Proposals
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
              My Future Swaps
            </Link>
          </>
        )}
        <WalletConnector />
      </HStack>
    </Flex>
  );
}

export default Header;

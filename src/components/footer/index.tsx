import React from 'react';
import {
  Center,
  Link,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

function Footer() {
  return (
    <>
      <Center>
        <HStack spacing="20px">
          <Link to="/" as={ReactLink} color="custom.red">
            Home
          </Link>
          <Link to="/faqs" as={ReactLink} color="custom.red">
            FAQs
          </Link>
          <Link href="https://discord.gg/F2urcAc" isExternal color="custom.red">
            Discord
          </Link>
          <Link href="https://twitter.com/secrethsanta" isExternal color="custom.red">
            Twitter
          </Link>
        </HStack>
      </Center>
      <Center margin="10px">
        <Text
          color="custom.grey"
          fontSize="14.5px"
        >
          Made by
          {' '}
          <Link
            href="https://twitter.com/clementcodes"
            color="custom.red"
            isExternal
          >
            Clemlak
          </Link>
        </Text>
      </Center>
      <Center margin="10px">
        <Text
          color="custom.grey"
          fontSize="14.5px"
        >
          Donations are appreciated
          {' '}
          <Link
            href="https://etherscan.io/address/0x6eC701832Ee19F224453951d127811421031F7e4"
            color="custom.red"
            isExternal
          >
            0x6eC7...F7e4
          </Link>
          {' '}
          <span role="img" aria-label="present">😊</span>
        </Text>
      </Center>
    </>
  );
}

export default Footer;

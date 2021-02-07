import React, {
  useState,
} from 'react';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
  Container,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import {
  useWeb3React,
} from '@web3-react/core';

import Trade from './components/trade';
import AddModal from '../../components/addModal';

import {
  signChallenge,
  verifyChallenge,
} from '../../utils/utils';

function Trades() {
  const {
    account,
    library,
  } = useWeb3React();

  const [isAddModalOpen, toggleAddModal] = useState<boolean>(false);

  return (
    <>
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => toggleAddModal(false)}
      />
      <Container maxW="56rem" centerContent>
        <HStack
          width="100%"
          marginBottom={6}
        >
          <Box width={3 / 4}>
            <Heading size="md">
              Current conditional swaps
            </Heading>
          </Box>
          <Box width={1 / 4} textAlign="right">
            <Button
              size="xs"
              rounded="100000px"
              bg="#00CC7E"
              as={ReactLink}
              to="/add"
            >
              Add new
            </Button>
            <Button
              size="xs"
              rounded="100000px"
              bg="#00CC7E"
              onClick={() => toggleAddModal(true)}
            >
              Add new
            </Button>
          </Box>
        </HStack>
        <Box>
          <Table
            variant="unstyled"
          >
            <Thead>
              <Tr
                color="#666"
              >
                <Th>Status</Th>
                <Th>Swap</Th>
                <Th>Current Price</Th>
                <Th>Type</Th>
                <Th>Maximum cost</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Trade />
              <Trade />
            </Tbody>
          </Table>
        </Box>
        <Button
          onClick={async () => {
            try {
              const {
                sig,
                challenge,
              } = await signChallenge(library);
              console.log(sig, challenge);
              console.log(verifyChallenge(challenge, account as string, sig));
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Sign In
        </Button>
      </Container>
    </>
  );
}

export default Trades;

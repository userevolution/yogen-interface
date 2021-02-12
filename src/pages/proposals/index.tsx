import React, {
  useEffect,
  useState,
} from 'react';
import {
  Center,
  Text,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  HStack,
  VStack,
  Tag,
} from '@chakra-ui/react';
import {
  useWeb3React,
} from '@web3-react/core';

import {
  fetchProposalsByNetworkId,
} from '../../utils/textile';

function formatCountdown(duration: number) {
  const days = Math.floor(duration / (60 * 60 * 24));
  const hours = Math.floor((duration % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = Math.floor(duration % 60);

  return `${days}d ${hours}h ${minutes}d ${seconds}s`;
}

function Proposals() {
  const {
    chainId,
  } = useWeb3React();

  const deadline = (Date.now() / 1000) + 60 * 60 * 24 * 7;
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const proposals = await fetchProposalsByNetworkId(chainId?.toString() as string);
        console.log(proposals);
      } catch (e) {
        console.log(e);
      }
    }

    fetchProposals();
  }, []);

  useEffect(() => {
    setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      setRemainingTime(deadline - now);
    }, 1000);
  }, []);

  return (
    <>
      <Center>
        <Box
          backgroundColor="#141414"
          padding="30px"
          borderRadius="20px"
        >
          <Heading
            fontFamily="Inter"
            color="#f5f5f5"
            fontSize="22px"
            fontWeight="700"
            marginBottom="18px"
          >
            Proposals
          </Heading>
          <Table>
            <Thead>
              <Tr>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Token In
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Token Out
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Proposed Price
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Current Price
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Delivery Date
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Expires In
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {[0, 1, 2, 3].map((value) => (
                <Tr
                  key={value}
                  _hover={{
                    backgroundColor: '#292929',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    alert(`Proposal ${value}`);
                  }}
                >
                  <Td
                    borderColor="#666666"
                    color="#666666"
                  >
                    <HStack spacing="12px">
                      <Image
                        src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png"
                        borderRadius="full"
                        boxSize="32px"
                      />
                      <VStack
                        spacing="4px"
                        alignItems="start"
                      >
                        <Text
                          color="#f5f5f5"
                          fontWeight="600"
                        >
                          1600.5 SNX
                        </Text>
                        <Text>
                          Synthetix
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td
                    borderColor="#666666"
                    color="#666666"
                  >
                    <HStack spacing="12px">
                      <Image
                        src="https://tokens.1inch.exchange/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png"
                        borderRadius="full"
                        boxSize="32px"
                      />
                      <VStack
                        spacing="4px"
                        alignItems="start"
                      >
                        <Text
                          color="#f5f5f5"
                          fontWeight="600"
                        >
                          1 YFI
                        </Text>
                        <Text>
                          Yearn.finance
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td
                    borderColor="#666666"
                    color="#666666"
                  >
                    1600.52 SNX per YFI
                    <br />
                    0.000624795 YFI per SNX
                  </Td>
                  <Td
                    borderColor="#666666"
                  >
                    <Tag
                      color="#f24333"
                      fontWeight="600"
                      backgroundColor="#3A0903"
                    >
                      -3.63%
                    </Tag>
                  </Td>
                  <Td
                    borderColor="#666666"
                    color="#666666"
                  >
                    2021/06/12
                    <br />
                    09:00:00
                  </Td>
                  <Td
                    borderColor="#666666"
                    color="#666666"
                  >
                    <VStack
                      spacing="4px"
                      alignItems="start"
                    >
                      <Text
                        color="#f5f5f5"
                        fontWeight="600"
                      >
                        {formatCountdown(remainingTime)}
                      </Text>
                      <Text>
                        by 0x0123...cdef
                      </Text>
                    </VStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </>
  );
}

export default Proposals;

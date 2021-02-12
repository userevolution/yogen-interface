/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

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
} from '@chakra-ui/react';
import {
  useWeb3React,
} from '@web3-react/core';
import {
  utils,
  FixedNumber,
  BigNumber,
} from 'ethers';

import {
  fetchProposalsByNetworkId,
} from '../../utils/textile';
import {
  fetchPriceOn1Inch,
} from '../../utils/priceFetcher';

import uniswapTokenList from '../../assets/tokenLists/uniswap.json';

function formatCountdown(duration: number) {
  const days = Math.floor(duration / (60 * 60 * 24));
  const hours = Math.floor((duration % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = Math.floor(duration % 60);

  return `${days}d ${hours}h ${minutes}d ${seconds}s`;
}

async function formatProposals(proposals: Proposal[], now: number) {
  const list: React.ReactChild[] = [];

  try {
    for (let i = 0; i < proposals.length; i += 1) {
      const proposal = proposals[i];
      const tokenIn = uniswapTokenList.tokens.filter((item) => item.address === proposal.tokenIn);
      const tokenOut = uniswapTokenList.tokens.filter((item) => item.address === proposal.tokenOut);
      const askedPrice = FixedNumber.from(proposal.amountOut)
        .divUnsafe(FixedNumber.from(proposal.amountIn))
        .toString();

      // eslint-disable-next-line no-await-in-loop
      const marketPrice = await fetchPriceOn1Inch(
        proposal.tokenIn,
        proposal.amountIn,
        proposal.tokenOut,
      );

      list.push(
        <Tr
          key={proposal._id}
          _hover={{
            backgroundColor: '#292929',
            cursor: 'pointer',
          }}
        >
          <Td
            borderColor="#666666"
            color="#666666"
          >
            <HStack spacing="12px">
              <Image
                src={tokenIn[0].logoURI}
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
                  {utils.formatUnits(BigNumber.from(proposal.amountIn), tokenIn[0].decimals).toString()}
                  {' '}
                  {tokenIn[0].symbol}
                </Text>
                <Text>
                  {tokenIn[0].name}
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
                src={tokenOut[0].logoURI}
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
                  {utils.formatUnits(BigNumber.from(proposal.amountOut), tokenOut[0].decimals).toString()}
                  {' '}
                  {tokenOut[0].symbol}
                </Text>
                <Text>
                  {tokenOut[0].name}
                </Text>
              </VStack>
            </HStack>
          </Td>
          <Td
            borderColor="#666666"
            color="#666666"
          >
            {`${askedPrice.split('.')[0]}.${askedPrice.split('.')[1] && askedPrice.split('.')[1].substring(0, 6)} ${tokenOut[0].symbol} per ${tokenIn[0].symbol}`}
          </Td>
          <Td
            borderColor="#666666"
          >
            {`${marketPrice.split('.')[0]}.${marketPrice.split('.')[1] && marketPrice.split('.')[1].substring(0, 6)} ${tokenOut[0].symbol} per ${tokenIn[0].symbol}`}
          </Td>
          <Td
            borderColor="#666666"
            color="#666666"
          >
            {new Date(parseInt(proposal.deliveryDate, 10) * 1000).toLocaleString()}
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
                {formatCountdown(parseInt(proposal.expiryDate, 10) - now)}
              </Text>
              <Text>
                {`by ${proposal.initiator.substr(0, 6)}...${proposal.initiator.substr(proposal.initiator.length - 4, proposal.initiator.length - 1)}`}
              </Text>
            </VStack>
          </Td>
        </Tr>,
      );
    }

    return list;
  } catch (e) {
    console.error(e);
    return list;
  }
}

function Proposals() {
  const {
    chainId,
  } = useWeb3React();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [formattedProposals, setFormattedProposals] = useState<React.ReactChild[]>([]);
  const [now, setNow] = useState<number>(Date.now() / 1000);

  useEffect(() => {
    setInterval(() => {
      setNow(Date.now() / 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const networkId = chainId ? chainId.toString() : '4';
        const res = await fetchProposalsByNetworkId(networkId);
        console.log(res);
        setProposals(res);
        setFormattedProposals(await formatProposals(res, now));
      } catch (e) {
        console.log(e);
      }
    }

    fetchProposals();
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
          >
            Proposals
          </Heading>
          <Text
            color="#666"
            marginBottom="18px"
          >
            Current future swap proposals that can be filled in by anyone.
          </Text>
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
                  From
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  To
                </Th>
                <Th
                  fontFamily="Inter"
                  textTransform="initial"
                  color="#f5f5f5"
                  fontWeight="600"
                  fontSize="18px"
                  borderColor="#666666"
                >
                  Asked Price
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
            {proposals.length === 0 ? (
              <>
                <Text
                  color="#666"
                  marginBottom="18px"
                >
                  No proposals are available.
                </Text>
              </>
            ) : (
              <Tbody>
                {formattedProposals}
              </Tbody>
            )}
          </Table>
        </Box>
      </Center>
    </>
  );
}

export default Proposals;

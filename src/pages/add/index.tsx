import React, {
  useState,
} from 'react';
import {
  Text,
  Container,
  VStack,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  MenuDivider,
  Image,
  Box,
  HStack,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
} from '@chakra-ui/icons';
import {
  useWeb3React,
} from '@web3-react/core';

import AmountModal from '../../components/amountModal';
import TokenModal from '../../components/tokenModal';

interface Token {
  address: string;
  name: string;
  symbol: string;
  icon: string;
}

const tokens: Token[] = [
  {
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  },
  {
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  },
  {
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  },
  {
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  },
];

function Add() {
  const {
    account,
    library,
  } = useWeb3React();

  const [tokenInAmount, setTokenInAmount] = useState<number>(0);
  const [isTokenInAmountModalOpen, toggleTokenInAmountModal] = useState<boolean>(false);

  const [tokenInAddress, setTokenInAddress] = useState<string>('');
  const [isTokenInModalOpen, toggleTokenInModal] = useState<boolean>(false);

  const [isPricePairOrderReversed, setPricePairOrderReversed] = useState<boolean>(false);

  return (
    <>
      <AmountModal
        isOpen={isTokenInAmountModalOpen}
        onClose={() => toggleTokenInAmountModal(false)}
        title="Token in amount"
        description="The amount of token to swap"
        amount={tokenInAmount}
        onAmountChange={(amount: number) => setTokenInAmount(amount)}
      />
      <TokenModal
        isOpen={isTokenInModalOpen}
        onClose={() => toggleTokenInModal(false)}
        title="Select a token"
        description="The token to swap"
        address={tokenInAddress}
        onAddressChange={(address: string) => setTokenInAddress(address)}
        symbol="ETH"
      />
      <Container
        padding={6}
        maxWidth="lg"
        textAlign="center"
        fontSize="26px"
        lineHeight="1.7"
      >
        <Heading
          marginBottom="2em"
          fontSize="36px"
          fontWeight={700}
        >
          Create new conditional swap
        </Heading>
        <VStack
          spacing="24px"
          marginBottom="3rem"
        >
          <Text
            fontWeight={400}
            fontSize="26px"
          >
            I want to swap
            {' '}
            <Button
              _hover={{
                opacity: 0.8,
              }}
              color="#00CC7E"
              bg="#333333"
              verticalAlign="baseline"
              fontSize="26px"
              fontWeight={400}
              onClick={() => toggleTokenInAmountModal(true)}
            >
              {tokenInAmount}
            </Button>
            {' '}
            <Button
              color="#00CC7E"
              bg="#333333"
              verticalAlign="baseline"
              fontSize="26px"
              fontWeight={400}
              onClick={() => toggleTokenInModal(true)}
            >
              ETH
            </Button>
            {' '}
            to
            {' '}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color="#00CC7E"
                bg="#333333"
                verticalAlign="baseline"
                fontSize="26px"
                fontWeight={400}
                _hover={{
                  bg: '#333333',
                  opacity: 0.8,
                }}
              >
                ?
              </MenuButton>
              <MenuList
                bg="custom.alternativeBackground"
                border="none"
              >
                <Box
                  width="100%"
                  padding="0 10px 10px 10px"
                >
                  <Input
                    type="text"
                    placeholder="Search name or paste address"
                    autoFocus
                    bg="#333333"
                    border="none"
                  />
                </Box>
                <MenuDivider />
                {tokens.map((token) => (
                  <MenuItem>
                    <HStack
                      width="100%"
                      justifyContent="space-around"
                    >
                      <HStack>
                        <Image
                          src={token.icon}
                          borderRadius="full"
                          boxSize="24px"
                        />
                        <Text
                          color="custom.primary"
                          fontSize="16px"
                          fontWeight={500}
                        >
                          {token.symbol}
                        </Text>
                        <Text
                          color="custom.secondary"
                          fontSize="12px"
                          fontWeight={300}
                        >
                          {token.name}
                        </Text>
                      </HStack>
                      <Box>
                        <Text
                          color="custom.primary"
                          fontSize="16px"
                          fontWeight={500}
                        >
                          1430.5355
                        </Text>
                      </Box>
                    </HStack>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {' '}
            on
            {' '}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color="#00CC7E"
                bg="#333333"
                verticalAlign="baseline"
                fontSize="26px"
                fontWeight={400}
              >
                Select a dex
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <span role="img" aria-label="Uniswap">🦄</span>
                  {' '}
                  Uniswap
                </MenuItem>
                <MenuItem>
                  <span role="img" aria-label="Uniswap">🥞</span>
                  {' '}
                  PancakeSwap
                </MenuItem>
              </MenuList>
            </Menu>
            ,
            {' '}
            if the
            {' '}
            <Button
              color="#00CC7E"
              bg="#333333"
              verticalAlign="baseline"
              fontSize="26px"
              fontWeight={400}
              onClick={() => setPricePairOrderReversed(!isPricePairOrderReversed)}
            >
              {isPricePairOrderReversed ? (
                <>ETH/BTC</>
              ) : (
                <>BTC/ETH</>
              )}
            </Button>
            {' '}
            price drops under
            {' '}
            <Button
              color="#00CC7E"
              bg="#333333"
              verticalAlign="baseline"
              fontSize="26px"
              fontWeight={400}
            >
              1
            </Button>
            .
          </Text>
          <Text
            fontSize="26px"
            fontWeight={400}
          >
            At this price, I will receive at least
            {' '}
            <span
              style={{
                color: '#00CC7E',
              }}
            >
              10 ETH
            </span>
            .
          </Text>
          <Text
            fontSize="26px"
            fontWeight={400}
          >
            With a maximum gas price of
            {' '}
            <Button
              color="#00CC7E"
              bg="#333333"
              verticalAlign="baseline"
              fontSize="26px"
              fontWeight={400}
            >
              10
            </Button>
            {' '}
            Gwei, the transaction will cost
            {' '}
            <span
              style={{
                color: '#00CC7E',
                fontSize: 'inherit',
                fontWeight: 'inherit',
              }}
            >
              0.004 ETH
            </span>
            .
          </Text>
        </VStack>
        <Button
          rounded="full"
          backgroundColor="#00CC7E"
          size="lg"
          _hover={{
            backgroundColor: '#00CC7E',
            opacity: 0.8,
          }}
        >
          Create my stop loss
        </Button>
      </Container>
    </>
  );
}

export default Add;

import React, {
  useEffect,
  useState,
} from 'react';
import {
  Center,
  Text,
  Box,
  Heading,
  Input,
  VStack,
  Button,
  Flex,
  Image,
  HStack,
} from '@chakra-ui/react';
import {
  ArrowDownIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

import TokenModal from '../../components/tokenModal';

function Create() {
  const [tokenIn, setTokenIn] = useState<Token>();
  const [amountIn, setAmountIn] = useState<string>('');
  const [balanceIn, setBalanceIn] = useState<string>('-');

  const [tokenOut, setTokenOut] = useState<Token>();
  const [amountOut, setAmountOut] = useState<string>('');
  const [balanceOut, setBalanceOut] = useState<string>('-');

  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');

  const [isTokenInModalOpen, toggleTokenInModal] = useState<boolean>(false);
  const [isTokenOutModalOpen, toggleTokenOutModal] = useState<boolean>(false);

  return (
    <>
      <TokenModal
        isOpen={isTokenInModalOpen}
        onClose={() => toggleTokenInModal(false)}
        title="Select a token"
        onTokenSelected={(token: Token) => {
          toggleTokenInModal(false);
          setTokenIn(token);
        }}
      />
      <TokenModal
        isOpen={isTokenOutModalOpen}
        onClose={() => toggleTokenOutModal(false)}
        title="Select a token"
        onTokenSelected={(token: Token) => {
          toggleTokenOutModal(false);
          setTokenOut(token);
        }}
      />
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
            Create Proposal
          </Heading>
          <VStack spacing="16px">
            <Box width="100%">
              <Flex
                width="100%"
                paddingX="14px"
                marginBottom="8px"
                color="#999"
              >
                <Box width={1 / 2}>
                  <Text>
                    From
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text>
                    Balance:
                    {' '}
                    {balanceIn}
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                padding="14px"
                backgroundColor="#333"
                borderRadius="full"
                justifyContent="space-between"
              >
                <Box>
                  <Input
                    padding={0}
                    fontSize="22px"
                    fontWeight="500"
                    _placeholder={{
                      color: '#666',
                    }}
                    _focus={{
                      outline: 'none',
                    }}
                    placeholder="0.0"
                    width="100%"
                    border="none"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    width="100%"
                    borderRadius="full"
                    backgroundColor="custom.brand"
                    alignItems="center"
                    onClick={() => toggleTokenInModal(true)}
                  >
                    {tokenIn ? (
                      <HStack>
                        <Image
                          src={tokenIn.icon}
                          borderRadius="full"
                          boxSize="24px"
                        />
                        <Text
                          color="custom.primary"
                          fontSize="16px"
                          fontWeight={500}
                        >
                          {tokenIn.symbol}
                        </Text>
                      </HStack>
                    ) : (
                      <>
                        <span>
                          Select token
                        </span>
                        <span
                          style={{
                            marginInlineStart: '0.5rem',
                          }}
                        >
                          <ChevronDownIcon />
                        </span>
                      </>
                    )}
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box>
              <ArrowDownIcon />
            </Box>
            <Box width="100%">
              <Flex
                width="100%"
                paddingX="14px"
                marginBottom="8px"
                color="#999"
              >
                <Box width={1 / 2}>
                  <Text>
                    To
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text>
                    Balance:
                    {' '}
                    {balanceOut}
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                padding="14px"
                backgroundColor="#333"
                borderRadius="full"
                justifyContent="space-between"
              >
                <Box>
                  <Input
                    padding={0}
                    fontSize="22px"
                    fontWeight="500"
                    _placeholder={{
                      color: '#666',
                    }}
                    _focus={{
                      outline: 'none',
                    }}
                    placeholder="0.0"
                    width="100%"
                    border="none"
                    value={amountOut}
                    onChange={(e) => setAmountOut(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    width="100%"
                    borderRadius="full"
                    backgroundColor="custom.brand"
                    alignItems="center"
                    onClick={() => toggleTokenOutModal(true)}
                  >
                    {tokenOut ? (
                      <HStack>
                        <Image
                          src={tokenOut.icon}
                          borderRadius="full"
                          boxSize="24px"
                        />
                        <Text
                          color="custom.primary"
                          fontSize="16px"
                          fontWeight={500}
                        >
                          {tokenOut.symbol}
                        </Text>
                      </HStack>
                    ) : (
                      <>
                        <span>
                          Select token
                        </span>
                        <span
                          style={{
                            marginInlineStart: '0.5rem',
                          }}
                        >
                          <ChevronDownIcon />
                        </span>
                      </>
                    )}
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box width="100%">
              <Flex
                width="100%"
                paddingX="14px"
                marginBottom="8px"
                color="#999"
              >
                <Box
                  width={1 / 2}
                  marginRight="12px"
                >
                  <Text>
                    Delivery date
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  paddingX="14px"
                  marginLeft="12px"
                >
                  <Text>
                    Expiry date
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
              >
                <Box
                  width={1 / 2}
                  marginRight="12px"
                >
                  <input
                    type="datetime-local"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().substring(0, 16)}
                    style={{
                      width: '100%',
                      borderRadius: '99999999px',
                      padding: '14px',
                      backgroundColor: '#333',
                      color: '#f5f5f5',
                    }}
                  />
                </Box>
                <Box
                  width={1 / 2}
                  marginLeft="12px"
                >
                  <input
                    type="datetime-local"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().substring(0, 16)}
                    style={{
                      width: '100%',
                      borderRadius: '99999999px',
                      padding: '14px',
                      backgroundColor: '#333',
                      color: '#f5f5f5',
                    }}
                  />
                </Box>
              </Flex>
            </Box>
            <Box width="100%">
              <Flex
                width="100%"
                paddingX="14px"
              >
                <Box width={1 / 2}>
                  <Text
                    fontSize="14px"
                    color="#999"
                  >
                    Current price
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                  >
                    0.011534 ETH per UNI
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                paddingX="12px"
              >
                <Box width={1 / 2}>
                  <Text
                    fontSize="14px"
                    color="#999"
                  >
                    Asked price
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                  >
                    0.012 UNI per ETH
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                paddingX="12px"
              >
                <Box width={1 / 2}>
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                  >
                    Difference
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    color="custom.brand"
                  >
                    +36%
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box width="100%">
              <Button
                isFullWidth
                borderRadius="full"
                backgroundColor="custom.brand"
                fontSize="20px"
                paddingY="28px"
                disabled={
                  tokenIn === undefined || tokenOut === undefined || amountIn === '' || amountOut === '' || deliveryDate === '' || expiryDate === ''
                }
                onClick={() => {
                  console.log(tokenIn);
                  console.log(tokenOut);

                  console.log(amountIn);
                  console.log(amountOut);

                  console.log(deliveryDate);
                  console.log(expiryDate);
                }}
              >
                Create proposal
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </>
  );
}

export default Create;

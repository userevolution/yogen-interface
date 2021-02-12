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
import {
  useWeb3React,
} from '@web3-react/core';
import {
  utils,
  FixedNumber,
} from 'ethers';

import TokenModal from '../../components/tokenModal';

import {
  signProposal,
} from '../../utils/utils';
import {
  fetchPriceOn1Inch,
  fetchPriceOnDex,
} from '../../utils/priceFetcher';
import {
  saveProposal,
} from '../../utils/textile';
import {
  getBalance,
} from '../../utils/erc20';

import QuestionIcon from '../../assets/img/question.png';

function Create() {
  const {
    account,
    library,
    chainId,
  } = useWeb3React();

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

  const [askedPrice, setAskedPrice] = useState<string>('-');
  const [marketPrice, setMarketPrice] = useState<string>('-');
  const [expectedChange, setExpectedChange] = useState<string>('-');

  const [buttonText, setButtonText] = useState<string>('Create a proposal');

  useEffect(() => {
    if (tokenIn && tokenOut && amountIn !== '' && amountOut !== '') {
      const newAskedPrice = FixedNumber.from(amountOut).divUnsafe(FixedNumber.from(amountIn));
      setAskedPrice(newAskedPrice.toString());
    }
  }, [tokenIn, tokenOut, amountIn, amountOut]);

  useEffect(() => {
    async function fetchPrice() {
      try {
        if (chainId === 1) {
          const price = await fetchPriceOn1Inch(
            tokenIn?.address as string,
            utils.parseUnits(amountIn, tokenIn?.decimals).toString(),
            tokenOut?.address as string,
          );

          setMarketPrice(price);
        } else {
          const price = await fetchPriceOnDex(
            library,
            chainId as number,
            tokenIn?.address as string,
            utils.parseUnits(amountIn, tokenIn?.decimals),
            tokenOut?.address as string,
          );

          setMarketPrice(utils.formatUnits(price, tokenOut?.decimals));
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (tokenIn !== undefined && tokenOut !== undefined && amountIn !== '') {
      fetchPrice();
    }
  }, [tokenIn, tokenOut, amountIn]);

  useEffect(() => {
    if (askedPrice !== '-' && marketPrice !== '-') {
      setExpectedChange(
        FixedNumber.from(askedPrice)
          .subUnsafe(FixedNumber.from(marketPrice))
          .divUnsafe(FixedNumber.from(marketPrice))
          .mulUnsafe(FixedNumber.from(100))
          .toString(),
      );
    }
  }, [askedPrice, marketPrice]);

  useEffect(() => {
    async function fetchBalances() {
      try {
        if (tokenIn && account) {
          const balance = await getBalance(library, tokenIn.address, account as string);
          setBalanceIn(balance);
        }

        if (tokenOut && account) {
          const balance = await getBalance(library, tokenOut.address, account as string);
          setBalanceOut(balance);
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchBalances();
  }, [tokenIn, tokenOut]);

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
          >
            Create Proposal
          </Heading>
          <Text
            color="#666"
            marginBottom="18px"
          >
            Create a future swap proposal that can be filled in by anyone.
          </Text>
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
                          src={tokenIn.logoURI}
                          borderRadius="full"
                          boxSize="24px"
                          fallbackSrc={QuestionIcon}
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
                          src={tokenOut.logoURI}
                          borderRadius="full"
                          boxSize="24px"
                          fallbackSrc={QuestionIcon}
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
                    fontSize="16px"
                    fontWeight="600"
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
                    {askedPrice !== '-' ? (
                      <>
                        {`${askedPrice.split('.')[0]}.${askedPrice.split('.')[1] && askedPrice.split('.')[1].substring(0, 6)} ${tokenOut?.symbol} per ${tokenIn?.symbol}`}
                      </>
                    ) : (
                      <>-</>
                    )}
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                paddingX="14px"
              >
                <Box width={1 / 2}>
                  <Text
                    fontSize="14px"
                    color="#999"
                  >
                    Current price on
                    {' '}
                    {chainId === 1 ? '1inch' : 'Uniswap'}
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text
                    fontSize="14px"
                    color="#999"
                  >
                    {marketPrice !== '-' ? (
                      <>
                        {`${marketPrice.split('.')[0]}.${marketPrice.split('.')[1] && marketPrice.split('.')[1].substring(0, 6)} ${tokenOut?.symbol} per ${tokenIn?.symbol}`}
                      </>
                    ) : (
                      <>-</>
                    )}
                  </Text>
                </Box>
              </Flex>
              <Flex
                width="100%"
                paddingX="14px"
              >
                <Box width={1 / 2}>
                  <Text
                    fontSize="14px"
                    color="#999"
                  >
                    Expected changed
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text
                    fontSize="14px"
                    color="#999"
                    fontWeight="600"
                  >
                    {marketPrice !== '-' && askedPrice !== '-' ? (
                      <>
                        {`${expectedChange.split('.')[0]}.${expectedChange.split('.')[1] && expectedChange.split('.')[1].substring(0, 4)}%`}
                      </>
                    ) : (
                      <>
                        -
                      </>
                    )}
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
                  !account || tokenIn === undefined || tokenOut === undefined || amountIn === '' || amountOut === '' || deliveryDate === '' || expiryDate === ''
                }
                onClick={async () => {
                  try {
                    setButtonText('Waiting for signature...');

                    const sig = await signProposal(
                      library,
                      tokenIn?.address as string,
                      utils.parseUnits(amountIn, tokenIn?.decimals as number).toString(),
                      tokenOut?.address as string,
                      utils.parseUnits(amountOut, tokenOut?.decimals as number).toString(),
                      (new Date(deliveryDate).getTime() / 1000).toString(),
                      (new Date(expiryDate).getTime() / 1000).toString(),
                      chainId?.toString(10) as string,
                    );

                    console.log(sig);

                    setButtonText('Saving proposal...');

                    await saveProposal({
                      _id: Math.random().toString(),
                      initiator: account as string,
                      tokenIn: tokenIn?.address as string,
                      amountIn: utils.parseUnits(amountIn, tokenIn?.decimals).toString(),
                      tokenOut: tokenOut?.address as string,
                      amountOut: utils.parseUnits(amountOut, tokenOut?.decimals).toString(),
                      deliveryDate: (new Date(deliveryDate).getTime() / 1000).toString(),
                      expiryDate: (new Date(expiryDate).getTime() / 1000).toString(),
                      sig,
                      networkId: chainId?.toString(10) as string,
                    });

                    setButtonText('Prposal created!');
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                {account ? (
                  <>
                    {buttonText}
                  </>
                ) : (
                  <>
                    Connect a wallet
                  </>
                )}
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </>
  );
}

export default Create;

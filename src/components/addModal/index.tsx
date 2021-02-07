import React, {
  useState,
  useEffect,
} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Input,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Text,
  Box,
  Tooltip,
  Center,
} from '@chakra-ui/react';
import {
  QuestionIcon,
} from '@chakra-ui/icons';
import {
  useWeb3React,
} from '@web3-react/core';
import {
  utils,
  BigNumber,
} from 'ethers';

import {
  getBalance,
  getSymbol,
  getDecimals,
  isAllowanceEnough,
  approveMaxAmount,
} from '../../utils/erc20';

import {
  getPrice,
} from '../../utils/router';

import {
  signSwap,
} from '../../utils/utils';

interface AddModalProps {
  isOpen: boolean;
  onClose: Function;
}

function AddModal(props: AddModalProps) {
  const {
    isOpen,
    onClose,
  } = props;

  const {
    library,
    account,
  } = useWeb3React();

  const [amountIn, setAmountIn] = useState<string>('');
  const [tokenIn, setTokenIn] = useState<string>('');
  const [tokenInBalance, setTokenInBalance] = useState<string>('0');
  const [tokenInSymbol, setTokenInSymbol] = useState<string>('-');
  const [tokenInDecimals, setTokenInDecimals] = useState<number>(0);

  const [amountOut, setAmountOut] = useState<string>('');
  const [tokenOut, setTokenOut] = useState<string>('');
  const [tokenOutBalance, setTokenOutBalance] = useState<string>('0');
  const [tokenOutSymbol, setTokenOutSymbol] = useState<string>('-');
  const [tokenOutDecimals, setTokenOutDecimals] = useState<number>(0);

  const [triggerPrice, setTriggerPrice] = useState<string>('');

  const [currentPrice0, setCurrentPrice0] = useState<string>('');
  const [currentPrice1, setCurrentPrice1] = useState<string>('');

  const [maxGas, setMaxGas] = useState<string>('');
  const [maxCost, setMaxCost] = useState<string>('0');

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Add stop loss');

  useEffect(() => {
    async function fetchData() {
      const symbol = await getSymbol(library, tokenIn);
      setTokenInSymbol(symbol);
      const decimals = await getDecimals(library, tokenIn);
      setTokenInDecimals(decimals);
      const balance = await getBalance(library, tokenIn, account as string);
      setTokenInBalance(balance);
    }

    if (utils.isAddress(tokenIn)) {
      fetchData();
    }
  }, [tokenIn]);

  useEffect(() => {
    async function fetchData() {
      const symbol = await getSymbol(library, tokenOut);
      setTokenOutSymbol(symbol);
      const decimals = await getDecimals(library, tokenOut);
      setTokenOutDecimals(decimals);
      const balance = await getBalance(library, tokenOut, account as string);
      setTokenOutBalance(balance);
    }

    if (utils.isAddress(tokenOut)) {
      fetchData();
    }
  }, [tokenOut]);

  useEffect(() => {
    async function getPrices() {
      try {
        const price0 = await getPrice(library, '1', tokenIn, tokenOut);
        setCurrentPrice0(price0);

        const price1 = await getPrice(library, '1', tokenOut, tokenIn);
        setCurrentPrice1(price1);
      } catch (e) {
        console.error(e);
      }
    }

    if (utils.isAddress(tokenIn) && utils.isAddress(tokenOut)) {
      getPrices();
    }
  }, [tokenIn, tokenOut]);

  useEffect(() => {
    async function getAmountOut() {
      try {
        const res = await getPrice(library, amountIn, tokenIn, tokenOut);
        setAmountOut(res);
      } catch (e) {
        console.error(e);
      }
    }

    if (amountIn !== '' && tokenIn !== '' && tokenOut !== '') {
      getAmountOut();
    }
  }, [amountIn]);

  useEffect(() => {
    if (maxGas !== '') {
      const res = utils.parseUnits(maxGas, 'gwei').mul(BigNumber.from('21000'));
      setMaxCost(utils.formatEther(res));
    }
  }, [maxGas]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <ModalOverlay />
      <ModalContent
        bg="#1f1f1f"
        color="#eeeeee"
      >
        <ModalHeader>
          Set a conditional swap
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="24px">
            <HStack>
              <Box width={1 / 2}>
                <FormControl id="amountIn">
                  <FormLabel>From</FormLabel>
                  <HStack
                    spacing={0}
                  >
                    <Input
                      value={amountIn}
                      onChange={(e) => setAmountIn(e.target.value)}
                      size="lg"
                      variant="primary"
                      type="number"
                      placeholder="0.0"
                      _placeholder={{
                        color: 'custom.secondary',
                      }}
                      borderRightRadius="0"
                      textOverflow="ellipsis"
                    />
                    <Center
                      bg="custom.medium"
                      height="3rem"
                      paddingRight="10px"
                      borderRightRadius="0.375rem"
                    >
                      <Button
                        size="sm"
                        bg="custom.brand"
                        color="custom.primary"
                        borderRadius="full"
                        onClick={() => setAmountIn(tokenInBalance)}
                        disabled={tokenInBalance === '0.0' || tokenInBalance === '0'}
                      >
                        Max
                      </Button>
                    </Center>
                  </HStack>
                </FormControl>
              </Box>
              <Box width={1 / 2}>
                <FormControl id="tokenIn">
                  <FormLabel>
                    Balance:
                    {' '}
                    {tokenInBalance}
                    {' '}
                    {tokenInSymbol}
                  </FormLabel>
                  <Input
                    value={tokenIn}
                    onChange={(e) => setTokenIn(e.target.value)}
                    size="lg"
                    type="text"
                    variant="primary"
                    textOverflow="ellipsis"
                    placeholder="0x105C33C3DE2de4B1726616847787Ce182f7a6622"
                    _placeholder={{
                      color: 'custom.secondary',
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box width={1 / 2}>
                <FormControl id="amountOut">
                  <FormLabel>To (Estimated)</FormLabel>
                  <Input
                    value={amountOut}
                    disabled
                    cursor="not-allowed"
                    size="lg"
                    type="number"
                    variant="primary"
                    textOverflow="ellipsis"
                    placeholder="0.0"
                    _placeholder={{
                      color: 'custom.secondary',
                    }}
                  />
                </FormControl>
              </Box>
              <Box width={1 / 2}>
                <FormControl id="tokenOut">
                  <FormLabel>
                    Balance:
                    {' '}
                    {tokenOutBalance}
                    {' '}
                    {tokenOutSymbol}
                  </FormLabel>
                  <Input
                    value={tokenOut}
                    onChange={(e) => setTokenOut(e.target.value)}
                    size="lg"
                    type="text"
                    variant="primary"
                    textOverflow="ellipsis"
                    placeholder="0x105C33C3DE2de4B1726616847787Ce182f7a6622"
                    _placeholder={{
                      color: 'custom.secondary',
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <Box width="100%">
              <FormControl id="triggerPrice">
                <FormLabel>Trigger price</FormLabel>
                <HStack spacing={0}>
                  <Input
                    value={triggerPrice}
                    onChange={(e) => setTriggerPrice(e.target.value)}
                    type="number"
                    variant="primary"
                    placeholder="0.0"
                    _placeholder={{
                      color: 'custom.secondary',
                    }}
                    borderRightRadius="0"
                    textOverflow="ellipsis"
                  />
                  <Center
                    bg="custom.medium"
                    height="2.5rem"
                    paddingRight="10px"
                    borderRightRadius="0.375rem"
                  >
                    <Button
                      size="xs"
                      bg="custom.brand"
                      color="custom.primary"
                      borderRadius="full"
                      onClick={() => setTriggerPrice(currentPrice0)}
                      disabled={currentPrice0 === ''}
                    >
                      Current price
                    </Button>
                  </Center>
                </HStack>
              </FormControl>
              <Text
                marginTop={2}
                alignSelf="flex-start"
                fontSize="small"
                color="custom.secondary"
              >
                Current price:
                {currentPrice0 !== '' && currentPrice1 !== '' ? (
                  <>
                    {' '}
                    {`1 ${tokenInSymbol} = ${currentPrice0} ${tokenOutSymbol}`}
                    ,
                    {' '}
                    {`${currentPrice1} ${tokenInSymbol} = 1 ${tokenOutSymbol}`}
                    .
                  </>
                ) : (
                  <>
                    {' '}
                    -
                  </>
                )}
              </Text>
            </Box>
            <Box>
              <HStack>
                <Box width={1 / 2}>
                  <FormControl id="type">
                    <FormLabel>
                      Swap type
                      {' '}
                      <Tooltip
                        hasArrow
                        label="- Stop loss orders are triggered when a price goes under a certain value."
                        bg="custom.medium"
                        color="custom.primary"
                      >
                        <QuestionIcon />
                      </Tooltip>
                    </FormLabel>
                    <Input
                      type="text"
                      variant="primary"
                      value="Stop loss"
                      disabled
                      _placeholder={{
                        color: 'custom.secondary',
                      }}
                    />
                  </FormControl>
                </Box>
                <Box width={1 / 2}>
                  <FormControl id="tokenOut">
                    <FormLabel>Max gas price (Gwei)</FormLabel>
                    <Input
                      value={maxGas}
                      onChange={(e) => setMaxGas(e.target.value)}
                      type="number"
                      variant="primary"
                      placeholder="0.0"
                      _placeholder={{
                        color: 'custom.secondary',
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Text
                marginTop={2}
                alignSelf="flex-start"
                fontSize="small"
                color="custom.secondary"
              >
                Maximum cost for this swap:
                {' '}
                {`${maxCost} ETH.`}
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            isFullWidth
            variant="primary"
            size="lg"
            borderRadius="full"
            isLoading={isButtonLoading}
            loadingText={loadingText}
            onClick={async () => {
              try {
                setLoadingText('Checking allowance...');
                setIsButtonLoading(true);

                const isEnough = await isAllowanceEnough(
                  library,
                  process.env.REACT_APP_WETH_ADDRESS,
                  account as string,
                  process.env.REACT_APP_NUCTER_ADDRESS,
                  utils.parseEther(maxCost),
                );

                if (!isEnough) {
                  setLoadingText('Waiting for approval...');
                  const receipt = await approveMaxAmount(
                    library,
                    process.env.REACT_APP_WETH_ADDRESS,
                    process.env.REACT_APP_NUCTER_ADDRESS,
                  );

                  console.log(receipt);
                }

                setLoadingText('Waiting for signature...');
                const sig = await signSwap(
                  library,
                  utils.parseUnits(amountIn, tokenInDecimals).toString(),
                  tokenIn,
                  utils.parseUnits(amountOut, tokenOutDecimals).toString(),
                  tokenOut,
                  utils.parseUnits(triggerPrice, tokenOutDecimals).toString(),
                  utils.parseEther(maxCost).toString(),
                  '0',
                );

                console.log(sig);

                setButtonText('Limit order saved!');
              } catch (e) {
                console.error(e);
                setButtonText('An error occurred...');
              } finally {
                setIsButtonLoading(false);
              }
            }}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddModal;

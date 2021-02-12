import React from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  VStack,
  Link,
  Image,
} from '@chakra-ui/react';

import {
  injected,
  walletConnect,
  portis,
} from '../../store/connectors';

import MetaMaskIcon from '../../assets/img/metaMask.png';
import WalletConnectIcon from '../../assets/img/walletConnect.svg';
import PortisIcon from '../../assets/img/portis.png';

function returnNetwork(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 4:
      return 'Rinkeby';
    case 79377087078960:
      return 'Arbitrum';
    default:
      return 'Wrong network';
  }
}

function WalletConnector() {
  const {
    activate,
    account,
    chainId,
  } = useWeb3React();

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  return (
    <>
      {account && (
        <Button
          rounded="full"
          bg="custom.primary"
          color="custom.secondary"
        >
          {returnNetwork(chainId as number)}
        </Button>
      )}
      <Button
        rounded="100000px"
        onClick={onOpen}
        bg="#00CC7E"
        _hover={{
          backgroundColor: '#00CC7E',
          opacity: 0.8,
        }}
      >
        {account ? (
          <>
            {`${account.substr(0, 6)}...${account.substr(account.length - 4, account.length - 1)}`}
          </>
        ) : (
          <>
            Connect a wallet
          </>
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#1f1f1f"
        >
          <ModalHeader>
            Connect a wallet
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="10px">
              <Button
                isFullWidth
                bg="#00CC7E"
                _hover={{
                  backgroundColor: '#00CC7E',
                  opacity: 0.8,
                }}
                onClick={async () => {
                  try {
                    await activate(injected);
                    onClose();
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <Image
                  src={MetaMaskIcon}
                  alt="MetaMask icon"
                  width="24px"
                  marginRight="10px"
                />
                MetaMask
              </Button>
              <Button
                isFullWidth
                bg="#00CC7E"
                _hover={{
                  backgroundColor: '#00CC7E',
                  opacity: 0.8,
                }}
                onClick={async () => {
                  try {
                    await activate(walletConnect);
                    onClose();
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <Image
                  src={WalletConnectIcon}
                  alt="WalletConnect icon"
                  width="24px"
                  marginRight="10px"
                />
                WalletConnect
              </Button>
              <Button
                isFullWidth
                bg="#00CC7E"
                _hover={{
                  backgroundColor: '#00CC7E',
                  opacity: 0.8,
                }}
                onClick={async () => {
                  try {
                    await activate(portis);
                    onClose();
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <Image
                  src={PortisIcon}
                  alt="Portis icon"
                  width="24px"
                  marginRight="10px"
                />
                Portis
              </Button>
              <Text marginTop="1rem !important">
                New to Ethereum?
                {' '}
                <Link
                  href="https://ethereum.org/en/wallets/"
                  isExternal
                >
                  Learn more about wallets
                </Link>
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WalletConnector;

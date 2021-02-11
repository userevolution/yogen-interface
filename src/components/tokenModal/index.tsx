import React, {
  useState,
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
  Text,
  Divider,
  VStack,
  HStack,
  Box,
  Image,
} from '@chakra-ui/react';

interface TokenModalProps {
  isOpen: boolean;
  onClose: Function;
  title: string;
  address: string;
  onAddressChange: Function;
  symbol: string;
}

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

function TokenModal(props: TokenModalProps) {
  const {
    isOpen,
    onClose,
    title,
    address,
    onAddressChange,
    symbol,
  } = props;

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
          {title}
        </ModalHeader>
        <ModalCloseButton
          autoFocus={false}
        />
        <ModalBody>
          <Input
            type="text"
            placeholder="Search name or paste address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            autoFocus
            bg="#333333"
            border="none"
            size="lg"
            borderRadius="full"
          />
          <Divider marginY={5} />
          <VStack spacing="20px" marginBottom="10px">
            {tokens.map((token) => (
              <HStack
                width="100%"
                justifyContent="space-between"
                onClick={() => alert(token.name)}
                _hover={{
                  backgroundColor: '#333',
                }}
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
                    0
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TokenModal;

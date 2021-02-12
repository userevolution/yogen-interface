import React, {
  useState,
} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Input,
  Text,
  Divider,
  VStack,
  HStack,
  Box,
  Image,
} from '@chakra-ui/react';
import {
  useWeb3React,
} from '@web3-react/core';

import CustomTokenList from '../../assets/tokenLists/custom.json';
import QuestionIcon from '../../assets/img/question.png';

interface TokenModalProps {
  isOpen: boolean;
  onClose: Function;
  title: string;
  onTokenSelected: Function;
}

function TokenModal(props: TokenModalProps) {
  const {
    isOpen,
    onClose,
    title,
    onTokenSelected,
  } = props;

  const {
    chainId,
  } = useWeb3React();

  const [searchAddress, setSearchAddress] = useState<string>('');

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
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            autoFocus
            bg="#333333"
            border="none"
            size="lg"
            borderRadius="full"
          />
          <Divider marginY={5} />
          <VStack spacing="20px" marginBottom="10px">
            {CustomTokenList.tokens.filter((token) => token.chainId === chainId).map((token) => (
              <HStack
                key={(Math.random().toString())}
                width="100%"
                justifyContent="space-between"
                onClick={() => onTokenSelected(token)}
                _hover={{
                  backgroundColor: '#333',
                }}
              >
                <HStack>
                  <Image
                    src={token.logoURI}
                    borderRadius="full"
                    boxSize="24px"
                    fallbackSrc={QuestionIcon}
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

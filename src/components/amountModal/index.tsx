import React from 'react';
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
} from '@chakra-ui/react';

interface AmountModalInterface {
  isOpen: boolean;
  onClose: Function;
  title: string;
  description: string;
  amount: number;
  onAmountChange: Function;
}

function AmountModal(props: AmountModalInterface) {
  const {
    isOpen,
    onClose,
    title,
    description,
    amount,
    onAmountChange,
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
          <Text
            marginBottom={2}
          >
            {description}
          </Text>
          <Input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            autoFocus
            bg="#333333"
            border="none"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isFullWidth
            bg="#00CC7E"
            onClick={() => onClose()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AmountModal;

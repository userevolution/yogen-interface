import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
} from '@chakra-ui/react';

function WrongNetwork() {
  return (
    <Container
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      marginTop={3}
    >
      <Alert
        status="error"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" m={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wrong network!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          You are currently connected to the wrong network. Please connect to Mainnet.
        </AlertDescription>
      </Alert>
    </Container>
  );
}

export default WrongNetwork;

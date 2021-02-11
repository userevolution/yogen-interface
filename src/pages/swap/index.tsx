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
  HStack,
  VStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import {
  ArrowDownIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

function Home() {
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
            marginBottom="18px"
          >
            Create a proposal
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
                    Balance: 0
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
                  />
                </Box>
                <Box>
                  <Button
                    width="100%"
                    borderRadius="full"
                    backgroundColor="custom.brand"
                    alignItems="center"
                  >
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
                    From
                  </Text>
                </Box>
                <Box
                  width={1 / 2}
                  textAlign="right"
                >
                  <Text>
                    Balance: 0
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
                  />
                </Box>
                <Box>
                  <Button
                    width="100%"
                    borderRadius="full"
                    backgroundColor="custom.brand"
                  >
                    Select token
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
                    Expires on
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
                    id="meeting-time"
                    name="meeting-time"
                    min="2018-06-07T00:00"
                    max="2018-06-14T00:00"
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
                    id="meeting-time"
                    name="meeting-time"
                    value="2018-06-12T19:30"
                    min="2018-06-07T00:00"
                    max="2018-06-14T00:00"
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

export default Home;

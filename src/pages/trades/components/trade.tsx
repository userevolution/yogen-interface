import React from 'react';
import {
  Tr,
  Td,
  Button,
  Tag,
} from '@chakra-ui/react';

function Trade() {
  return (
    <Tr
      borderTopStyle="solid"
      borderTopWidth="1px"
      borderTopColor="custom.secondary"
    >
      <Td>
        <Tag>
          Pending
        </Tag>
      </Td>
      <Td>
        From 50 NDX
        <br />
        To 1 ETH
      </Td>
      <Td>
        1 NDX = 0.0035 ETH
        <br />
        1 ETH = 1324 NDX
      </Td>
      <Td>
        Stop loss at
        <br />
        0.032 ETH
      </Td>
      <Td>
        200 Gwei
        <br />
        0.0041 ETH
      </Td>
      <Td>
        <Button
          variant="link"
          textColor="#F5003D"
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}

export default Trade;

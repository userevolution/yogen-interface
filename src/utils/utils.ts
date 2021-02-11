import {
  providers,
} from 'ethers';

async function signProposal(
  provider: providers.Web3Provider,
  tokenIn: string,
  amountIn: string,
  tokenOut: string,
  amountOut: string,
  deliveryDate: string,
  expiryDate: string,
  chainId: string,
): Promise<string> {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const sig = await provider.getSigner()._signTypedData({
      name: 'Yogen',
      version: '1',
      verifyingContract: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
      chainId,
    }, {
      Swap: [
        {
          name: 'tokenIn',
          type: 'address',
        },
        {
          name: 'amountIn',
          type: 'uint256',
        },
        {
          name: 'tokenOut',
          type: 'address',
        },
        {
          name: 'amountOut',
          type: 'uint256',
        },
        {
          name: 'deliveryDate',
          type: 'uint256',
        },
        {
          name: 'expiryDate',
          type: 'uint256',
        },
      ],
    }, {
      tokenIn,
      amountIn,
      tokenOut,
      amountOut,
      deliveryDate,
      expiryDate,
    });

    return sig;
  } catch (e) {
    console.error(e);
    throw new Error('Cannot sign proposal');
  }
}

export {
  signProposal,
};

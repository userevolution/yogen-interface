import {
  providers,
  utils,
} from 'ethers';
import axios from 'axios';

async function signChallenge(provider: providers.Web3Provider): Promise<{
  challenge: string;
  sig: string;
}> {
  try {
    const challenge = Date.now().toString();
    const sig = await provider.getSigner().signMessage(challenge);

    return {
      challenge,
      sig,
    };
  } catch (e) {
    throw new Error('Cannot sign challenge');
  }
}

function verifyChallenge(
  challenge: string,
  investor: string,
  sig: string,
): Boolean {
  return utils.verifyMessage(challenge, sig) === investor;
}

async function getTrades(
  address: string,
  challenge: string,
  sig: string,
) {
  try {
    const res = await axios({
      method: 'get',
      url: '',
      params: {
        address,
        challenge,
        sig,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error('Cannot get trades');
  }
}

async function signSwap(
  provider: providers.Web3Provider,
  amountIn: string,
  tokenIn: string,
  amountOut: string,
  tokenOut: string,
  triggerPrice: string,
  maxCost: string,
  nonce: string,
): Promise<string> {
  try {
    console.log(
      amountIn,
      tokenIn,
      amountOut,
      tokenOut,
      maxCost,
      nonce,
    );

    // eslint-disable-next-line no-underscore-dangle
    const sig = await provider.getSigner()._signTypedData({
      name: 'Nucter',
      version: '1',
      verifyingContract: process.env.REACT_APP_NUCTER_ADDRESS,
      chainId: 4,
    }, {
      Swap: [
        {
          name: 'amountIn',
          type: 'uint256',
        },
        {
          name: 'tokenIn',
          type: 'address',
        },
        {
          name: 'amountOut',
          type: 'uint256',
        },
        {
          name: 'tokenOut',
          type: 'address',
        },
        {
          name: 'triggerPrice',
          type: 'uint256',
        },
        {
          name: 'maxCost',
          type: 'uint256',
        },
        {
          name: 'nonce',
          type: 'uint256',
        },
      ],
    }, {
      amountIn,
      tokenIn,
      amountOut,
      tokenOut,
      triggerPrice,
      maxCost,
      nonce,
    });

    return sig;
  } catch (e) {
    console.error(e);
    throw new Error('Cannot sign swap');
  }
}

export {
  signChallenge,
  getTrades,
  verifyChallenge,
  signSwap,
};

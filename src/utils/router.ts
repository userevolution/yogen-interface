import {
  providers,
  utils,
} from 'ethers';

import {
  UniswapV2Router02__factory,
  ERC20__factory,
} from './typechain';

async function getPrice(
  provider: providers.Web3Provider,
  amountIn: string,
  tokenIn: string,
  tokenOut: string,
): Promise<string> {
  try {
    const router = UniswapV2Router02__factory.connect('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', provider);
    const tokenInContract = ERC20__factory.connect(tokenIn, provider);
    const tokenOutContract = ERC20__factory.connect(tokenOut, provider);
    const decimalsIn = await tokenInContract.decimals();
    const decimalsOut = await tokenOutContract.decimals();

    const amountsOut = await router.getAmountsOut(
      utils.parseUnits(amountIn, decimalsIn),
      [
        tokenIn,
        tokenOut,
      ],
    );

    return utils.formatUnits(amountsOut[1], decimalsOut);
  } catch (e) {
    throw new Error('Cannot get price');
  }
}

export {
  getPrice,
};

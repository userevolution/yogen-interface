import axios from 'axios';
import {
  utils,
  FixedNumber,
  providers,
  BigNumber,
} from 'ethers';

import {
  UniswapV2Router02__factory,
} from './typechain';

async function fetchPriceOn1Inch(
  fromTokenAddress: string,
  amount: string,
  toTokenAddress: string,
): Promise<string> {
  try {
    const res = await axios({
      url: 'https://api.1inch.exchange/v2.0/quote',
      method: 'get',
      params: {
        fromTokenAddress,
        amount,
        toTokenAddress,
      },
    });

    console.log(res.data);

    const fromAmount = res.data.fromTokenAmount as string;
    const fromToken = res.data.fromToken as Token;
    const toToken = res.data.toToken as Token;
    const toAmount = res.data.toTokenAmount as string;

    const price = FixedNumber.from(toAmount).divUnsafe(FixedNumber.from(fromAmount));
    return price.toString();
  } catch (e) {
    console.error(e);
    throw new Error('Cannot fetch price on 1inch');
  }
}

async function fetchPriceOnDex(
  provider: providers.Web3Provider,
  chainId: number,
  tokenIn: string,
  amountIn: BigNumber,
  tokenOut: string,
): Promise<string> {
  try {
    const routerAddress = chainId === 79377087078960 ? '0x054ef3Fb14894f106401D707a3f4debb7D082887' : '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    const router = UniswapV2Router02__factory.connect(routerAddress, provider);
    const amountsOut = await router.getAmountsOut(
      amountIn,
      [
        tokenIn,
        tokenOut,
      ],
    );

    return amountsOut[1].toString();
  } catch (e) {
    console.error(e);
    throw new Error('Cannot fetch price on dex');
  }
}
export {
  fetchPriceOn1Inch,
  fetchPriceOnDex,
};

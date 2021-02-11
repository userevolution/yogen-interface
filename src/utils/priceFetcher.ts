import axios from 'axios';
import {
  utils,
} from 'ethers';

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

    const price = utils.parseUnits(toAmount, toToken.decimals).div(
      utils.parseUnits(fromAmount, fromToken.decimals),
    );

    return price.toString();
  } catch (e) {
    console.error(e);
    throw new Error('Cannot fetch price on 1inch');
  }
}

export {
  fetchPriceOn1Inch,
};

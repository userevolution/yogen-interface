interface Proposal {
  _id: string,
  initiator: string;
  tokenIn: string;
  amountIn: string;
  tokenOut: string;
  amountOut: string;
  deliveryDate: string;
  expiryDate: string;
  sig: string;
  networkId: string;
}

interface Token {
  address: string;
  name: string;
  symbol: string;
  icon: string;
}

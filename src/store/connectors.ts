import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [4],
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    4: 'https://eth-mainnet.alchemyapi.io/v2/3lUDh0uCWOjmf2xXmr_16OPQX07w7jll',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 12000,
});

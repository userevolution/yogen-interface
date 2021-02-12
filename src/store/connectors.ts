import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { PortisConnector } from '@web3-react/portis-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 79377087078960],
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    4: 'https://eth-mainnet.alchemyapi.io/v2/3lUDh0uCWOjmf2xXmr_16OPQX07w7jll',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 12000,
});

export const portis = new PortisConnector({
  dAppId: '7d4ef95f-e623-4f87-9b3e-297be7f3f34b',
  networks: [4],
});

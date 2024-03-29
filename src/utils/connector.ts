import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001]
});

const walletconnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'web3-react-demo'
});

const walletconnectTest = new WalletConnectConnector({
  rpc: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

const walletlinkTest = new WalletLinkConnector({
  url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'web3-react-demo'
});

export const mainConnectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};

export const testConnectors = {
  injected: injected,
  walletconnect: walletconnectTest,
  coinbaseWallet: walletlinkTest
};

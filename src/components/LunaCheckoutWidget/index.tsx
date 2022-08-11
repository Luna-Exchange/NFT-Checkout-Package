import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import LunaCheckoutWidget from './LunaCheckoutWidget';

const getLibraryFromEthers = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

const getLibraryFromWeb3 = (provider: any) => {
  return new Web3(provider);
};

const libraries = {
  WEB3: 'web3',
  ETHERS: 'ethers'
} as const;

type Library = typeof libraries[keyof typeof libraries];

type ComponentProps = {
  collectionId: string;
  username: string;
  password: string;
  libraryType?: Library;
};

const LunaCheckout: React.FC<ComponentProps> = ({
  collectionId,
  username,
  password,
  libraryType = 'ethers'
}): JSX.Element => {
  return (
    <Web3ReactProvider getLibrary={libraryType === 'ethers' ? getLibraryFromEthers : getLibraryFromWeb3}>
      <LunaCheckoutWidget
        collectionId={collectionId}
        username={username}
        password={password}
        libraryType={libraryType}
      />
    </Web3ReactProvider>
  );
};

export default LunaCheckout;

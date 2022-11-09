import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import CheckoutWidget from './CheckoutWidget';
import { ComponentProps } from './type';

const getLibraryFromEthers = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

const getLibraryFromWeb3 = (provider: any) => {
  return new Web3(provider);
};

const InsomniaCheckoutWeb3Wrapper: React.FC<ComponentProps> = ({
  collectionId,
  libraryType = 'ethers',
  view = 'normal'
}): JSX.Element => {
  return (
    <Web3ReactProvider getLibrary={libraryType === 'ethers' ? getLibraryFromEthers : getLibraryFromWeb3}>
      <CheckoutWidget collectionId={collectionId} libraryType={libraryType} view={view} />
    </Web3ReactProvider>
  );
};

export default InsomniaCheckoutWeb3Wrapper;

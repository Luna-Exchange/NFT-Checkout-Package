# NFT-Checkout-Package

Luna NFT project's [React plugin](https://github.com/Luna-Exchange/NFT-Checkout-package) library published by creator's portal.

**Built with React and TypeScript.**
Check out the [Demo](https://zingy-cendol-f45b26.netlify.app/)!

## Usage

### Install from NPM

```bash
yarn add nft-checkout
```

```bash
npm install nft-checkout
```

### Import LunaCheckoutWidget from package

You can import component:

```ts
import { LunaCheckoutWidget } from "nft-checkout";
```

and use with collection id, api key and secret key:

```tsx
<LunaCheckoutWidget
  collectionId="<id>"
  username="<api_key>"
  password="<secret_key>"
/>
```

You can import IFrameBox compoent and use directly in your front-end code.

### Components

```tsx
import { IFrmaeBox } from "nft-checkout";
...
<IFrameBox
  active={active}
  nftImgUrl={mintInfo.image}
  nftTitle={mintInfo.name}
  nftDescription={mintInfo.description}
  projectAbout={mintInfo.about}
  price={mintPrice}
  maxSupply={maxSupply}
  mintsRemain={mintRemain}
  mintBtnDisabled={false}
  bgColor={mintInfo.checkout_background_color}
  questions={mintInfo.first_party_data.map(
    (item: any) => item.question
  )}
  socialLinks={{
    twitter: twitterEnabled,
    discord: discordEnabled,
    facebook: facebookEnabled,
    instagram: instagramEnabled,
  }}
  nftCount={nftCount}
  nftCountError={nftCountError}
  onNftCountChange={onNftCountChange}
  answers={answers}
  answersError={answersError}
  onAnswersChange={onAnswersChange}
  onConnectWallet={handleConnectMetamask}
  onDisconnectWallet={handleDisconnectMetamask}
  onMintNft={handleMint}
  mintProcessing={mintProcessing}
  mintSucceed={mintSucceed}
  setMintSucceed={setMintSucceed}
/>
```

## IFrameBox props type

```tsx
  active: boolean;
  nftImgUrl?: string;
  nftTitle: string;
  nftDescription: string;
  projectAbout: string;
  price: number;
  maxSupply: number;
  mintsRemain: number | undefined;
  mintBtnDisabled: boolean;
  bgColor: string | undefined;
  questions: string[];
  socialLinks: { [key: string]: boolean };
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
  onMintNft?: () => void;
  className?: string;
  nftCount: string;
  nftCountError?: boolean;
  onNftCountChange: (value: string) => void;
  answers: string[];
  answersError?: boolean[];
  onAnswersChange: (index: number, value: string) => void;
  mintProcessing: boolean;
  mintSucceed: boolean;
  setMintSucceed: (value: boolean) => void;
```
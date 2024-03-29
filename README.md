# NFT-Checkout-Package

Luna NFT project's [React plugin](https://github.com/Luna-Exchange/NFT-Checkout-package) library published by creator's portal.

**Built with React and TypeScript.**
Check out the [Demo](https://j4c12g-3000.preview.csb.app/)!

## Usage

### Install from NPM

```bash
yarn add @insomnia-labs/mintstack-sdk-react
```

```bash
npm install @insomnia-labs/mintstack-sdk-react
```

### Import CheckoutWidget from package

You can import component and style:

```ts
import { CheckoutWidget } from '@insomnia-labs/mintstack-sdk-react';
import '@insomnia-labs/mintstack-sdk-react/lib/esm/styles/style.css';
```

and use with collection id, api key and secret key:

```tsx
<CheckoutWidget collectionId="<id>" libraryType="web3 | ethers" />
```

**note: Don't forget specify library type(whether web3 or ethers)! by default it's ethers.**

You can import DetailBox compoent and use directly in your front-end code.

### Components

```tsx
import { DetailBox } from "@insomnia-labs/mintstack-sdk-react";
...
<DetailBox
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
  font={mintInfo.checkout_font}
  fontColor={mintInfo.checkout_font_color}
  tcLink={mintInfo.terms_and_condition_link}
  termsProcess={termsProcess}
  onCancelTerms={handleCancelTerms}
  questions={mintInfo.first_party_data.map((item: any) => item.question)}
  socialLinks={{
    twitter: twitterEnabled,
    discord: discordEnabled,
    facebook: facebookEnabled,
    instagram: instagramEnabled
  }}
  nftCount={nftCount}
  nftCountError={nftCountError}
  onNftCountChange={onNftCountChange}
  answers={answers}
  setAnswers={setAnswers}
  answersError={answersError}
  onAnswersChange={onAnswersChange}
  onConnectWallet={handleConnectMetamask}
  onDisconnectWallet={handleDisconnectMetamask}
  onMintNft={handleMintBtn}
  onHandleMint={handleMint}
  mintProcessing={mintProcessing}
  mintSucceed={mintSucceed}
  setMintSucceed={setMintSucceed}
  chain={mintInfo.chain}
/>
```

## DetailBox props type

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
  font: string | undefined;
  fontColor: string | undefined;
  termsProcess?: boolean;
  onCancelTerms?: () => void;
  tcLink: string | undefined;
  questions: string[];
  socialLinks: { [key: string]: boolean };
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
  onMintNft?: (termsProcess: boolean) => void;
  onHandleMint?: () => void;
  className?: string;
  nftCount: string;
  nftCountError?: boolean;
  onNftCountChange: (value: string) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
  answersError?: boolean[];
  onAnswersChange: (index: number, value: string) => void;
  mintProcessing: boolean;
  mintSucceed: boolean;
  setMintSucceed: (value: boolean) => void;
  chain: string;
```

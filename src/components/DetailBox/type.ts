export enum StageType {
  TERMS = 'TERMS',
  QUESTION = 'QUESTION',
  NORMAL = 'NORMAL',
  CHOOOSENFT = 'CHOOSENFT'
}

export type ComponentProps = {
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
  isMultipleNft: boolean;
  isRandomMint: boolean;
  assets?: any[];
  onChangeTokenId: (tokenId: number) => void;
};

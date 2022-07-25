import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import { SpinningCircles } from 'react-loading-icons';

type ComponentProps = {
  active: boolean;
  nftImgUrl?: string;
  collectionTitle: string;
  nftTitle: string;
  nftDescription: string;
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
};

const IFrameBox: React.FC<ComponentProps> = ({
  active,
  nftImgUrl,
  collectionTitle,
  nftTitle,
  nftDescription,
  price,
  maxSupply,
  mintsRemain,
  mintBtnDisabled,
  bgColor,
  questions,
  socialLinks,
  onConnectWallet,
  onDisconnectWallet,
  onMintNft,
  className = '',
  nftCount,
  nftCountError = false,
  onNftCountChange,
  answers,
  answersError = [false, false, false],
  onAnswersChange,
  mintProcessing = false,
  mintSucceed = false,
  setMintSucceed
}): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div
        className={`flex flex-col xl:flex-row text-left w-full sm:min-h-min xl:max-h-[400px] box-border ${className}`}
        style={{ backgroundColor: bgColor ? bgColor : '#1d1d1d' }}
      >
        <div className="relative w-full min-h-[240px] sm:h-[400px] sm:w-[400px] items-center justify-center border-[1px] border-solid border-white sm:border-none">
          <img src={nftImgUrl} width="100%" height="100%" alt="" className="object-cover" />
          <div className="absolute" style={{ inset: 0 }}>
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%)'
              }}
              className="w-full h-[60%] transform -rotate-180"
            ></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-[38px] mx-4 xl:mx-16">
          <div className="flex flex-col gap-16 w-full sm:w-[315px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-[20px] leading-[24px] text-white">{nftTitle}</p>
                <p className="font-normal text-[14px] leading-[18px] text-white">{collectionTitle}</p>
              </div>
              <p className="text-[14px] leading-[18px] h-[72px] tracking-[0.16px] flex items-center text-white">
                {nftDescription}
              </p>
              <div className="flex flex-row text-white justify-between sm:gap-[80px]">
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-[16px] leading-[22px] flex items-center">Price</p>
                  <p className="font-semibold text-[16px] leading-[22px] flex items-center">
                    {active ? `${price} ETH` : '-'}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-[16px] leading-[22px] flex items-center">Total Mints</p>
                  <p className="font-semibold text-[16px] leading-[22px] flex items-center">
                    {!active ? '-' : maxSupply}
                  </p>
                </div>
              </div>
            </div>
            {!active ? (
              <button
                onClick={onConnectWallet}
                className="w-full p-[6px] text-[14px] font-normal border-[1px] border-solid border-white rounded-[4px] bg-none text-white cursor-pointer active:scale-[0.99]"
              >
                CONNECT WALLET
              </button>
            ) : (
              <button
                onClick={onDisconnectWallet}
                className="w-full p-[6px] text-[14px] font-normal border-[1px] border-solid border-white rounded-[4px] bg-none text-white cursor-pointer"
              >
                DISCONNECT WALLET
              </button>
            )}
          </div>
          <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-4 text-white">
            {socialLinks['twitter'] && <Icon icon="mdi:twitter" fontSize={24} />}
            {socialLinks['discord'] && <Icon icon="ic:baseline-discord" fontSize={24} />}
            {socialLinks['facebook'] && <Icon icon="gg:facebook" fontSize={24} />}
            {socialLinks['instagram'] && <Icon icon="mdi:instagram" fontSize={24} />}
          </div>
          <div
            className={`flex flex-col w-full sm:w-[320px] sm:ml-16 mb-2 sm:mb-0 ${questions[0] ? 'gap-[30px]' : ''}`}
          >
            {active && (
              <>
                {mintProcessing ? (
                  <div className="flex w-full h-full items-center justify-center">
                    <SpinningCircles />
                  </div>
                ) : mintSucceed ? (
                  <div className="flex flex-col gap-[34px] justify-center h-full">
                    <p className="flex items-center align-center justify-center font-normal text-[20px] leading-[24px] text-white">
                      {nftCount} NFT is(are) successfully minted.
                    </p>
                    <button
                      className="h-[34px] text-[14px] font-normal border-[1px] border-solid border-white rounded-[4px] text-white"
                      onClick={() => setMintSucceed(false)}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {questions[0] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-[12px] leading-[18px] font-normal text-white">
                              {questions[0]} Question 1
                            </p>
                            {answersError[0] && (
                              <p className="italic font-normal text-[12px] leading-[18px] text-white">required</p>
                            )}
                          </div>
                          <input
                            placeholder="Answer 1"
                            value={answers[0]}
                            onChange={(event) => onAnswersChange(0, event.target.value)}
                            className={`w-full px-2 py-3 rounded-[4px] bg-[#252525] text-[12px] leading-[18px] text-white ${
                              answersError[0] ? 'border-[2px] border-solid border-[#EB5757]' : 'border-none'
                            }`}
                          />
                        </div>
                      )}
                      {questions[1] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-[12px] leading-[18px] font-normal text-white">
                              {questions[1]} Question 2
                            </p>
                            {answersError[1] && (
                              <p className="italic font-normal text-[12px] leading-[18px] text-white">required</p>
                            )}
                          </div>
                          <input
                            placeholder="Answer 2"
                            value={answers[1]}
                            onChange={(event) => onAnswersChange(1, event.target.value)}
                            className={`w-full px-2 py-3 rounded-[4px] bg-[#252525] text-[12px] leading-[18px] text-white ${
                              answersError[1] ? 'border-[2px] border-solid border-[#EB5757]' : 'border-none'
                            }`}
                          />
                        </div>
                      )}
                      {questions[2] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-[12px] leading-[18px] font-normal text-white">
                              {questions[2]} Question 3
                            </p>
                            {answersError[2] && (
                              <p className="italic font-normal text-[12px] leading-[18px] text-white">required</p>
                            )}
                          </div>
                          <textarea
                            placeholder="Answer 3"
                            value={answers[2]}
                            onChange={(event) => onAnswersChange(2, event.target.value)}
                            className={`w-full h-[66px] px-2 py-3 rounded-[4px] bg-[#252525] text-[12px] leading-[18px] text-white ${
                              answersError[2] ? 'border-[2px] border-solid border-[#EB5757]' : 'border-none'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-4 justify-between">
                      <div className="w-[50%]">
                        <input
                          placeholder="Number of NFT"
                          value={nftCount}
                          onChange={(event) => onNftCountChange(event.target.value)}
                          className={`w-full px-2 rounded-[4px] h-[34px] ${
                            nftCountError ? 'border-[2px] border-solid border-[#EB5757]' : 'border-none'
                          }`}
                        />
                        {nftCountError && (
                          <p className="relative left-2 top-[5px] italic font-normal text-[12px] leading-[18px] text-white">
                            required
                          </p>
                        )}
                      </div>

                      <button
                        disabled={mintBtnDisabled && mintsRemain === 0}
                        onClick={onMintNft}
                        className="w-[50%] h-[34px] text-[14px] font-normal border-[1px] border-solid border-white rounded-[4px] bg-none text-white cursor-pointer active:enabled:scale-[0.99]"
                      >
                        MINT NFT
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameBox;

import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import { SpinningCircles } from 'react-loading-icons';

type ComponentProps = {
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
};

const IFrameBox: React.FC<ComponentProps> = ({
  active,
  nftImgUrl,
  nftTitle,
  nftDescription,
  projectAbout,
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
        className={`flex flex-col xl:flex-row text-left w-full sm:min-h-min xl:max-h-96 box-border box ${className}`}
        style={{ backgroundColor: bgColor ? bgColor : '#1d1d1d' }}
      >
        <div
          className="relative w-full sm:h-96 sm:w-96 items-center justify-center border border-solid border-white sm:border-none"
          style={{ minHeight: '240px' }}
        >
          <img src={nftImgUrl} width="100%" height="100%" alt="" className="object-cover" />
          <div className="absolute" style={{ inset: 0 }}>
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%)',
                height: '60%'
              }}
              className="w-full transform -rotate-180"
            ></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-9 mx-4 xl:mx-16">
          <div className="flex flex-col gap-16 w-full sm:w-80">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-xl text-white">{nftTitle}</p>
                <p className="font-normal text-sm text-white text-ellipsis w-full overflow-hidden items-center whitespace-nowrap">
                  {projectAbout}
                </p>
              </div>
              <p className="text-sm flex items-center text-white" style={{ height: '72px' }}>
                {nftDescription}
              </p>
              <div className="flex flex-row text-white justify-between sm:gap-20">
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-base flex items-center">Price</p>
                  <p className="font-semibold text-base flex items-center">{active ? `${price} ETH` : '-'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-base flex items-center">Total Mints</p>
                  <p className="font-semibold text-base flex items-center">{!active ? '-' : maxSupply}</p>
                </div>
              </div>
            </div>
            {!active ? (
              <button
                onClick={onConnectWallet}
                className="w-full font-normal border border-solid border-white rounded bg-none text-white cursor-pointer"
                style={{ padding: '6px', fontSize: '14px' }}
              >
                CONNECT WALLET
              </button>
            ) : (
              <button
                onClick={onDisconnectWallet}
                className="w-full font-normal border border-solid border-white rounded bg-none text-white cursor-pointer"
                style={{ padding: '6px', fontSize: '14px' }}
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
          <div className={`flex flex-col w-full sm:w-80 sm:ml-16 mb-2 sm:mb-0 ${questions[0] ? 'gap-7' : ''}`}>
            {active && (
              <>
                {mintProcessing ? (
                  <div className="flex w-full h-full items-center justify-center">
                    <SpinningCircles />
                  </div>
                ) : mintSucceed ? (
                  <div className="flex flex-col justify-center h-full" style={{ gap: '34px' }}>
                    <p className="flex items-center align-center justify-center font-normal text-xl text-white">
                      {nftCount} NFT is(are) successfully minted.
                    </p>
                    <button
                      className="font-normal border border-solid border-white rounded text-white"
                      style={{ height: '34px', fontSize: '14px' }}
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
                            <p className="text-xs font-normal text-white">{questions[0]} Question 1</p>
                            {answersError[0] && <p className="italic font-normal text-xs text-white">required</p>}
                          </div>
                          <input
                            placeholder="Answer 1"
                            value={answers[0]}
                            onChange={(event) => onAnswersChange(0, event.target.value)}
                            className={`w-full px-2 py-3 rounded bg-[#252525] text-xs text-white ${
                              answersError[0] ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                            }`}
                            style={{ borderColor: answersError ? '#EB5757' : 'none' }}
                          />
                        </div>
                      )}
                      {questions[1] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-xs font-normal text-white">{questions[1]} Question 2</p>
                            {answersError[1] && <p className="italic font-normal text-xs text-white">required</p>}
                          </div>
                          <input
                            placeholder="Answer 2"
                            value={answers[1]}
                            onChange={(event) => onAnswersChange(1, event.target.value)}
                            className={`w-full px-2 py-3 rounded bg-[#252525] text-xs text-white ${
                              answersError[1] ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                            }`}
                            style={{ borderColor: answersError ? '#EB5757' : 'none' }}
                          />
                        </div>
                      )}
                      {questions[2] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-xs font-normal text-white">{questions[2]} Question 3</p>
                            {answersError[2] && <p className="italic font-normal text-xs text-white">required</p>}
                          </div>
                          <textarea
                            placeholder="Answer 3"
                            value={answers[2]}
                            onChange={(event) => onAnswersChange(2, event.target.value)}
                            className={`w-full px-2 py-3 rounded bg-[#252525] text-xs text-white ${
                              answersError[2] ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                            }`}
                            style={{ height: '66px' }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-4 justify-between">
                      <div style={{ width: '50%' }}>
                        <input
                          placeholder="Number of NFT"
                          value={nftCount}
                          onChange={(event) => onNftCountChange(event.target.value)}
                          className={`w-full px-2 rounded h-8 ${
                            nftCountError ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                          }`}
                          style={{ borderColor: nftCountError ? '#EB5757' : 'none' }}
                        />
                        {nftCountError && (
                          <p className="relative left-2 top-1 italic font-normal text-xs text-white">required</p>
                        )}
                      </div>

                      <button
                        disabled={mintBtnDisabled && mintsRemain === 0}
                        onClick={onMintNft}
                        className="h-8 font-normal border border-solid border-white rounded bg-none text-white cursor-pointer active:enabled:scale-[0.99]"
                        style={{ width: '50%', fontSize: '14px' }}
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

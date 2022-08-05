import React, { useState } from 'react';
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
  setAnswers: (answers: string[]) => void;
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
  // onDisconnectWallet,
  onMintNft,
  className = '',
  nftCount,
  nftCountError = false,
  onNftCountChange,
  answers,
  setAnswers,
  answersError = [false, false, false],
  onAnswersChange,
  mintProcessing = false,
  mintSucceed = false,
  setMintSucceed
}): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<boolean[]>(answersError);

  const onBackward = () => {
    if (step > 0) setStep(step - 1);
  };

  const onForward = () => {
    if (!answers[step]) {
      const errors = error.map((e, i) => {
        return i === step ? (error[i] = true) : e;
      });
      setError(errors);
    } else {
      if (step < questions.length) setStep(step + 1);
    }
  };

  const handleReset = () => {
    const answersArrary = answers.map((answer, index) => {
      answers[index] = answer;
      error[index] = false;
      return (answer = '');
    });
    setAnswers(answersArrary);
    setStep(0);
    // onDisconnectWallet && onDisconnectWallet();
  };

  const onChange = (step: number, value: string) => {
    const errors = error.map((e, i) => {
      return i === step ? (error[i] = false) : e;
    });
    setError(errors);
    onAnswersChange(step, value);
  };

  return (
    <div className="container mx-auto" style={{ maxWidth: '841px' }}>
      <div
        className={`flex flex-col xl:flex-row text-left w-full sm:min-h-min xl:max-h-96 box-border box ${className}`}
        style={{ backgroundColor: bgColor ? bgColor : '#1d1d1d' }}
      >
        <div
          className="relative items-center justify-center w-full border border-white border-solid sm:h-96 sm:w-96 sm:border-none"
          style={{ minHeight: '240px' }}
        >
          <img src={nftImgUrl} width="100%" height="100%" alt="" className="object-cover sm:w-96 sm:h-96" />
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
        <div className="flex flex-col gap-4 mx-4 sm:flex-row pt-9 xl:ml-16 xl:ml-7">
          <div className="flex flex-col w-full gap-8 sm:w-80">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-normal text-white">{nftTitle}</p>
                <p
                  className="items-center w-full overflow-hidden text-sm font-normal text-white whitespace-nowrap"
                  style={{ textOverflow: 'ellipsis' }}
                >
                  {nftDescription}
                </p>
              </div>
              <p
                className="flex items-center text-sm text-white"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {projectAbout}
              </p>
              <div className="flex flex-row justify-between text-white sm:gap-20">
                <div className="flex flex-col gap-1">
                  <p className="flex items-center text-base font-normal">Price</p>
                  <p className="flex items-center text-base font-semibold">{active ? `${price} ETH` : '-'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="flex items-center text-base font-normal">Total Mints</p>
                  <p className="flex items-center text-base font-semibold">{!active ? '-' : maxSupply}</p>
                </div>
              </div>
            </div>
            {!active ? (
              <button
                onClick={onConnectWallet}
                className="w-full font-normal text-white border border-white border-solid rounded cursor-pointer bg-none mt-7"
                style={{ padding: '6px', fontSize: '14px' }}
              >
                CONNECT WALLET
              </button>
            ) : (
              <>
                {mintProcessing ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <SpinningCircles />
                  </div>
                ) : mintSucceed ? (
                  <div className="flex flex-col justify-center h-full" style={{ gap: '34px' }}>
                    <p className="flex items-center justify-center text-xl font-normal text-white align-center">
                      {nftCount} NFT is(are) successfully minted.
                    </p>
                    <button
                      className="font-normal text-white border border-white border-solid rounded"
                      style={{ height: '34px', fontSize: '14px' }}
                      onClick={() => setMintSucceed(false)}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {step < questions.length && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between gap-2">
                            <p className="text-xs font-normal text-white">{questions[step]}</p>
                            {error[step] && <p className="text-xs italic font-normal text-white">required</p>}
                          </div>
                          <input
                            name={`question${step}`}
                            placeholder={`Answer ${step}`}
                            value={answers[step] || ''}
                            onChange={(event) => onChange(step, event.target.value)}
                            className={`w-full px-2 py-3 rounded bg-[#252525] text-xs text-black ${
                              error[step] ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                            }`}
                            style={{ borderColor: error[step] ? '#EB5757' : 'none' }}
                          />
                        </div>
                      )}
                      {step === questions.length && (
                        <div className="flex flex-row justify-between gap-4 mt-7">
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
                              <p className="relative text-xs italic font-normal text-white left-2 top-1">required</p>
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
                      )}
                      <div className="flex flex-row gap-4 justify-center">
                        <div
                          className="flex flex-row gap-2 items-center text-xs cursor-pointer"
                          style={{ color: step > 0 ? 'white' : 'rgba(255,255,255,0.5)' }}
                          onClick={onBackward}
                        >
                          <Icon icon="akar-icons:arrow-left" />
                          <p>BACK</p>
                        </div>
                        <div
                          className="flex flex-row gap-2 items-center text-xs cursor-pointer"
                          style={{ color: step < questions.length ? 'white' : 'rgba(255,255,255,0.5)' }}
                          onClick={onForward}
                        >
                          <p>NEXT</p>
                          <Icon icon="akar-icons:arrow-right" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 text-white sm:flex-col sm:justify-start">
            {socialLinks['twitter'] && <Icon icon="mdi:twitter" fontSize={16} className="cursor-pointer" />}
            {socialLinks['discord'] && <Icon icon="ic:baseline-discord" fontSize={16} className="cursor-pointer" />}
            {socialLinks['facebook'] && <Icon icon="gg:facebook" fontSize={16} className="cursor-pointer" />}
            {socialLinks['instagram'] && <Icon icon="mdi:instagram" fontSize={16} className="cursor-pointer" />}
            {active && (
              <Icon
                icon="bx:reset"
                fontSize={16}
                className={`cursor-pointer ${
                  socialLinks['twitter'] ||
                  socialLinks['discord'] ||
                  socialLinks['facedbook'] ||
                  socialLinks['instagram']
                    ? `sm:mt-10`
                    : ''
                }`}
                onClick={handleReset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameBox;

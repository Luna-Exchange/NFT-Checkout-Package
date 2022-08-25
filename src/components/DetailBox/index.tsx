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
};

const DetailBox: React.FC<ComponentProps> = ({
  active,
  nftImgUrl,
  nftTitle,
  nftDescription,
  // projectAbout,
  price,
  maxSupply,
  mintsRemain,
  mintBtnDisabled,
  bgColor,
  // font,
  fontColor,
  tcLink,
  termsProcess = false,
  onCancelTerms,
  questions,
  socialLinks,
  onConnectWallet,
  // onDisconnectWallet,
  onMintNft,
  onHandleMint,
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
  setMintSucceed,
  chain
}): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<boolean[]>(answersError);
  const [checkedTcLink, setCheckedTcLink] = useState<boolean>(false);

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
    onCancelTerms && onCancelTerms();
    onNftCountChange && onNftCountChange('');
  };

  const onChange = (step: number, value: string) => {
    const errors = error.map((e, i) => {
      return i === step ? (error[i] = false) : e;
    });
    setError(errors);
    onAnswersChange(step, value);
  };

  const onMintBtn = (value: boolean) => {
    onMintNft && onMintNft(value);
  };

  return (
    <div
      className="container mx-auto rounded-2xl"
      style={{ maxWidth: '864px', maxHeight: '421px', boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className={`flex flex-col xl:flex-row text-left w-full sm:min-h-min box-border box rounded-2xl ${className}`}
        style={{ backgroundColor: bgColor ? bgColor : '#1d1d1d' }}
      >
        <div
          className="relative items-center justify-center w-full border border-white border-solid sm:h-full sm:border-none rounded-2xl"
          style={{ minHeight: '240px', maxWidth: '421px' }}
        >
          <img
            src={nftImgUrl}
            width="100%"
            height="100%"
            alt=""
            className="object-cover sm:w-full sm:h-full rounded-2xl"
          />
          <div className="absolute" style={{ inset: 0 }}>
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%)',
                height: '60%'
              }}
              className="w-full transform -rotate-180 rounded-2xl"
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-10 sm:flex-row pt-7">
          <div className="flex flex-col w-full gap-6 sm:w-80">
            <div className="flex flex-col">
              <div
                className="flex flex-col gap-2"
                style={{
                  color: fontColor ? fontColor : 'white'
                }}
              >
                <p className="text-xl font-bold">{nftTitle}</p>
                {/* <p className="items-center w-full overflow-hidden text-sm font-normal whitespace-nowrap">
                  {nftDescription}
                </p> */}
              </div>
              <div
                className="rounded-t-lg border-solid p-4 justify-between items-center mt-10"
                style={{ borderWidth: '1px', borderColor: '#E8E8E8', color: fontColor ? fontColor : 'white' }}
              >
                <p className="text-sm capitalize">description</p>
              </div>
              <div
                className="rounded-b-lg border-solid p-4 justify-between items-center"
                style={{
                  borderWidth: '0 1px 1px 1px',
                  borderColor: '#E8E8E8',
                  color: fontColor ? fontColor : 'white',
                  backgroundColor: `${bgColor}80`
                }}
              >
                <p
                  className="flex items-center text-sm"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: fontColor ? fontColor : 'white',
                    minHeight: '40px'
                  }}
                >
                  {nftDescription}
                </p>
              </div>
              <div className="flex flex-row justify-between pt-4 gap-2">
                <div
                  className="flex flex-col gap-1 rounded-lg py-2"
                  style={{ width: '150px', color: fontColor ? fontColor : 'white', border: '1px solid #E8E8E8' }}
                >
                  <p className="flex items-center text-base font-normal justify-center">Price</p>
                  <p className="flex items-center text-base font-semibold justify-center">
                    {active ? `${price} ${chain === 'ethereum' ? 'ETH' : 'MATIC'}` : '-'}
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1 rounded-lg py-2"
                  style={{ width: '150px', color: fontColor ? fontColor : 'white', border: '1px solid #E8E8E8' }}
                >
                  <p className="flex items-center text-base font-normal justify-center">Total Mints</p>
                  <p className="flex items-center text-base font-semibold justify-center">
                    {!active ? '-' : maxSupply}
                  </p>
                </div>
              </div>
            </div>
            {!active ? (
              <button
                onClick={onConnectWallet}
                className="w-full font-normal border border-white border-solid rounded cursor-pointer bg-none mt-2"
                style={{
                  padding: '6px',
                  fontSize: '14px',
                  color: fontColor ? fontColor : 'white'
                }}
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
                  <div className="flex flex-col justify-center h-full relative">
                    <p
                      className="flex absolute -top-2 items-center justify-center text-xl font-normal align-center"
                      style={{ color: fontColor ? fontColor : 'white' }}
                    >
                      {nftCount} NFT is(are) successfully minted.
                    </p>
                    <button
                      className="font-normal border border-white border-solid rounded"
                      style={{
                        height: '34px',
                        fontSize: '14px',
                        color: fontColor ? fontColor : 'white'
                      }}
                      onClick={() => setMintSucceed(false)}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {!termsProcess ? (
                        <>
                          {step < questions.length && (
                            <div className="flex flex-col gap-2">
                              <div
                                className="flex flex-row justify-between gap-2"
                                style={{ color: fontColor ? fontColor : 'white' }}
                              >
                                <p className="text-xs font-normal">{questions[step]}</p>
                                {error[step] && <p className="text-xs italic font-normal">required</p>}
                              </div>
                              <input
                                name={`question${step}`}
                                placeholder={`Answer ${step}`}
                                value={answers[step] || ''}
                                onChange={(event) => onChange(step, event.target.value)}
                                className={`w-full px-2 py-3 rounded bg-[#252525] text-xs text-black ${
                                  error[step] ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                                }`}
                                style={{
                                  borderColor: error[step] ? '#EB5757' : 'none'
                                }}
                              />
                            </div>
                          )}
                          {step === questions.length && (
                            <div className="flex flex-row justify-between gap-4 ">
                              <div className="relative" style={{ width: '50%' }}>
                                {nftCountError && (
                                  <p
                                    className="absolute text-xs italic font-normal left-1 -top-5"
                                    style={{
                                      color: fontColor ? fontColor : 'white'
                                    }}
                                  >
                                    required
                                  </p>
                                )}
                                <input
                                  placeholder="Number of NFT"
                                  value={nftCount}
                                  onChange={(event) => onNftCountChange(event.target.value)}
                                  className={`w-full px-2 rounded h-8 ${
                                    nftCountError ? 'border-2 border-solid border-[#EB5757]' : 'border-none'
                                  }`}
                                  style={{
                                    borderColor: nftCountError ? '#EB5757' : 'none'
                                  }}
                                />
                              </div>
                              <button
                                disabled={mintBtnDisabled && mintsRemain === 0}
                                onClick={() => onMintBtn(true)}
                                className="h-8 font-normal border border-solid border-white rounded bg-none cursor-pointer active:enabled:scale-[0.99]"
                                style={{
                                  width: '50%',
                                  fontSize: '14px',
                                  color: fontColor ? fontColor : 'white'
                                }}
                              >
                                MINT NFT
                              </button>
                            </div>
                          )}
                          <div className="flex flex-row gap-4 justify-center">
                            <div
                              className="flex flex-row gap-2 items-center text-xs cursor-pointer"
                              style={{
                                color:
                                  step > 0
                                    ? fontColor
                                      ? fontColor
                                      : 'white'
                                    : fontColor
                                    ? `${fontColor}80`
                                    : 'rgba(255,255,255,0.5)'
                              }}
                              onClick={onBackward}
                            >
                              <Icon icon="akar-icons:arrow-left" />
                              <p style={{}}>BACK</p>
                            </div>
                            <div
                              className="flex flex-row gap-2 items-center text-xs cursor-pointer"
                              style={{
                                color:
                                  step < questions.length
                                    ? fontColor
                                      ? fontColor
                                      : 'white'
                                    : fontColor
                                    ? `${fontColor}80`
                                    : 'rgba(255,255,255,0.5)'
                              }}
                              onClick={onForward}
                            >
                              <p style={{}}>NEXT</p>
                              <Icon icon="akar-icons:arrow-right" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <label
                            className="flex flex-row justify-start gap-2"
                            style={{ color: fontColor ? fontColor : 'white' }}
                          >
                            <input
                              type="checkbox"
                              checked={checkedTcLink}
                              onChange={() => setCheckedTcLink(!checkedTcLink)}
                            />
                            <p className="text-xs font-normal">
                              I agree with the{' '}
                              <a href={tcLink ? tcLink : '#'} target="_blank">
                                <u>Terms & Conditions</u>
                              </a>
                            </p>
                          </label>
                          <div className="flex flex-row justify-between gap-4">
                            <button
                              onClick={onCancelTerms}
                              className="h-8 font-normal border border-solid border-white rounded bg-none cursor-pointer active:enabled:scale-[0.99]"
                              style={{
                                width: '50%',
                                fontSize: '14px',
                                color: fontColor ? fontColor : 'white'
                              }}
                            >
                              CANCEL
                            </button>
                            <button
                              disabled={(mintBtnDisabled && mintsRemain === 0) || !checkedTcLink}
                              onClick={onHandleMint}
                              className="h-8 font-normal border border-solid border-white rounded bg-black cursor-pointer active:enabled:scale-[0.99]"
                              style={{
                                width: '50%',
                                fontSize: '14px',
                                backgroundColor:
                                  (mintBtnDisabled && mintsRemain === 0) || !checkedTcLink ? 'gray' : 'black',
                                cursor:
                                  !(mintBtnDisabled && mintsRemain === 0) && checkedTcLink ? 'pointer' : 'not-allowed',
                                color: fontColor ? fontColor : 'white',

                                filter: 'invert(100%)'
                              }}
                            >
                              MINT NFT
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div
            className="flex flex-row items-center justify-center gap-4 sm:flex-col sm:justify-start"
            style={{ color: fontColor ? fontColor : 'white' }}
          >
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

export default DetailBox;

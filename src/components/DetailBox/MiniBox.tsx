import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { SpinningCircles } from 'react-loading-icons';
import CheckoutLogo from '../../assets/CheckoutLogo';
import { CheckoutCover } from '../Cover';
import { StageType, ComponentProps } from './type';
import { Pagination } from '@mui/material';

const MiniBox: React.FC<ComponentProps> = ({
  active,
  nftImgUrl,
  // nftTitle,
  // nftDescription,
  price,
  maxSupply,
  mintsRemain,
  mintBtnDisabled,
  bgColor,
  fontColor,
  onCancelTerms,
  questions,
  // socialLinks,
  onConnectWallet,
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
  isMultipleNft,
  assets,
  chain,
  onChangeTokenId
}): JSX.Element => {
  const [stage, setStage] = useState<StageType>(StageType.NORMAL);
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<boolean[]>(answersError);
  const [currentNFTPgae, setCurrentNFTPage] = useState<number>(1);
  const [assetsList, setAssetsList] = useState<any>(assets);
  const [selectedNFTIndex, setSelectedNFTIndex] = useState<number>();

  useEffect(() => {
    setStage(active ? StageType.TERMS : StageType.NORMAL);
  }, [active]);

  const handleAgree = () => {
    if (isMultipleNft) setStage(StageType.CHOOOSENFT);
    else setStage(questions.length > 0 ? StageType.QUESTION : StageType.NORMAL);
  };

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
    setStage(StageType.NORMAL);
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

  const handleSelectNFT = (value: number, asset: any) => {
    setSelectedNFTIndex(value);
    onChangeTokenId(parseInt(asset.token_id));
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentNFTPage(value);
    setAssetsList(assets?.slice((value - 1) * 16, value * 16));
    setSelectedNFTIndex(undefined);
  };

  return (
    <div
      className="container mx-auto rounded-2xl w-max min-h-min"
      style={{ maxWidth: '864px', boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className={`flex flex-col text-left w-full sm:min-h-min box-border box rounded-2xl ${className}`}
        style={{ backgroundColor: bgColor ? bgColor : 'white' }}
      >
        {stage !== StageType.CHOOOSENFT && (
          <div
            className="relative items-center justify-center w-full border border-white border-solid sm:h-full sm:border-none rounded-2xl"
            style={{ minHeight: '240px', maxHeight: '421px', maxWidth: '421px' }}
          >
            <CheckoutCover isMultipleNft={isMultipleNft} assets={isMultipleNft ? assets : nftImgUrl} />
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
        )}
        {stage !== StageType.CHOOOSENFT ? (
          <div className="relative flex flex-col gap-0 pt-2">
            <div className="relative flex flex-col w-full mx-auto" style={{ minHeight: '180px', maxWidth: '325px' }}>
              <div className="flex flex-col">
                {stage === StageType.NORMAL ? (
                  <div className="flex flex-row justify-between pt-4 gap-2">
                    <div
                      className="flex flex-col gap-1 rounded-lg py-2"
                      style={{
                        width: '150px',
                        color: fontColor ? fontColor : '#222221',
                        border: '1px solid #E8E8E8',
                        backgroundColor: bgColor ? `${bgColor}80` : '#F8F8F8'
                      }}
                    >
                      <p className="flex items-center text-base font-normal justify-center">Price</p>
                      <p className="flex items-center text-base font-semibold justify-center">
                        {active ? `${price} ${chain === 'ethereum' ? 'ETH' : 'MATIC'}` : '-'}
                      </p>
                    </div>
                    <div
                      className="flex flex-col gap-1 rounded-lg py-2"
                      style={{
                        width: '150px',
                        color: fontColor ? fontColor : '#222221',
                        border: '1px solid #E8E8E8',
                        backgroundColor: bgColor ? `${bgColor}80` : '#F8F8F8'
                      }}
                    >
                      <p className="flex items-center text-base font-normal justify-center">Total Mints</p>
                      <p className="flex items-center text-base font-semibold justify-center">
                        {!active ? '-' : maxSupply}
                      </p>
                    </div>
                  </div>
                ) : stage === StageType.TERMS ? (
                  <>
                    {questions.length > 0 ? (
                      <div
                        className="rounded-lg border-solid p-3 justify-between items-center mt-4"
                        style={{
                          borderWidth: '1px',
                          borderColor: '#E8E8E8',
                          color: fontColor ? fontColor : '#222221',
                          backgroundColor: bgColor ? `${bgColor}80` : '#F8F8F8'
                        }}
                      >
                        <p className="text-md">You need to answer our questionaire first before mininting.</p>
                      </div>
                    ) : (
                      <div
                        className="rounded-lg border-solid p-3 justify-between items-center mt-4"
                        style={{
                          borderWidth: '1px',
                          borderColor: '#E8E8E8',
                          color: fontColor ? fontColor : '#222221',
                          backgroundColor: bgColor ? `${bgColor}80` : '#F8F8F8'
                        }}
                      >
                        <p className="text-sm">
                          By completing this process and minting the NFT, you agree with our Terms and Conditions.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="absolute bottom-2 w-full">
                {!active ? (
                  <button
                    onClick={onConnectWallet}
                    className="w-full font-normal border border-white border-solid rounded-full cursor-pointer bg-black mt-2 uppercase"
                    style={{
                      padding: '6px',
                      fontSize: '14px',
                      color: fontColor ? fontColor : 'white'
                    }}
                  >
                    connect wallet
                  </button>
                ) : stage === StageType.TERMS ? (
                  <button
                    onClick={handleAgree}
                    className="w-full font-normal border border-white border-solid rounded-full cursor-pointer bg-black mt-2 uppercase"
                    style={{
                      padding: '6px',
                      fontSize: '14px',
                      color: fontColor ? fontColor : 'white'
                    }}
                  >
                    agree and proceed
                  </button>
                ) : (
                  <>
                    {mintProcessing ? (
                      <div className="flex items-center justify-center w-full h-full">
                        <SpinningCircles fill={bgColor ? `${bgColor}80` : '#8247E5'} />
                      </div>
                    ) : mintSucceed ? (
                      <div className="flex flex-col justify-center h-full relative">
                        <p
                          className="flex absolute -top-8 items-center justify-center text-xl font-normal align-center"
                          style={{ color: fontColor ? fontColor : '#222221' }}
                        >
                          {nftCount} NFT is(are) successfully minted.
                        </p>
                        <button
                          className="font-normal border border-white border-solid rounded-full"
                          style={{
                            height: '34px',
                            fontSize: '14px',
                            color: fontColor ? fontColor : 'white',
                            backgroundColor: bgColor ? `${bgColor}80` : '#222221'
                          }}
                          onClick={() => setMintSucceed(false)}
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {step < questions.length && (
                          <>
                            <div className="flex flex-col gap-2">
                              <div
                                className="flex flex-row justify-between gap-2"
                                style={{ color: fontColor ? fontColor : '#222221' }}
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
                                  error[step] ? 'border-2 border-solid border-[#EB5757]' : 'border'
                                }`}
                                style={{
                                  borderColor: error[step] ? '#EB5757' : '#222221'
                                }}
                              />
                            </div>
                            <div className="flex flex-row gap-4 justify-center">
                              <div
                                className="flex flex-row gap-2 items-center text-xs cursor-pointer"
                                style={{
                                  color:
                                    step > 0
                                      ? fontColor
                                        ? fontColor
                                        : '#222221'
                                      : fontColor
                                      ? `${fontColor}80`
                                      : '#22222180'
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
                                      : '#22222180'
                                }}
                                onClick={onForward}
                              >
                                <p style={{}}>NEXT</p>
                                <Icon icon="akar-icons:arrow-right" />
                              </div>
                            </div>
                          </>
                        )}
                        {step === questions.length && (
                          <div className="flex flex-row justify-between gap-4 ">
                            <div className="relative" style={{ width: '50%' }}>
                              {nftCountError && (
                                <p
                                  className="absolute text-xs italic font-normal left-1 -top-5"
                                  style={{
                                    color: fontColor ? fontColor : '#222221'
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
                                  nftCountError ? 'border-2 border-solid border-[#EB5757]' : 'border'
                                }`}
                                style={{
                                  borderColor: nftCountError ? '#EB5757' : '#222221'
                                }}
                              />
                            </div>
                            <button
                              disabled={mintBtnDisabled && mintsRemain === 0}
                              onClick={onHandleMint}
                              className="h-8 font-normal border border-solid border-white rounded-full bg-none cursor-pointer active:enabled:scale-[0.99]"
                              style={{
                                width: '50%',
                                fontSize: '14px',
                                color: fontColor ? fontColor : 'white',
                                backgroundColor: bgColor ? `${bgColor}80` : '#222221'
                              }}
                            >
                              MINT NFT
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              className="flex items-start justify-end mb-2 px-2"
              style={{ color: fontColor ? fontColor : '#222221', minHeight: '12px' }}
            >
              {active && <Icon icon="bx:reset" fontSize={16} className="cursor-pointer" onClick={handleReset} />}
            </div>
            <div className="absolute bottom-2 flex flex-row gap-2 w-full items-center justify-center">
              <p className="text-xs font-normal">Powered by:</p>
              <CheckoutLogo />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-9 pt-9 pb-4 mx-auto">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-4 grid-rows-4 w-full gap-4">
                {assetsList?.map((asset: any, index: any) => (
                  <img
                    key={index}
                    src={asset.image}
                    className="cursor-pointer w-16 h-16 rounded-xl"
                    style={{ boxShadow: index === selectedNFTIndex ? '0px 0px 4px 2px #8247E5' : 'none' }}
                    onClick={() => handleSelectNFT(index, asset)}
                  />
                ))}
              </div>
              <div className="flex flex-col justify-between items-center">
                {assets && (
                  <Pagination
                    count={Math.ceil(assets.length / 16)}
                    page={currentNFTPgae}
                    shape="rounded"
                    onChange={handlePaginationChange}
                  />
                )}
                <button
                  className="w-80 font-normal border border-white border-solid rounded-full cursor-pointer bg-black mt-2 uppercase"
                  style={{
                    padding: '6px',
                    fontSize: '14px',
                    color: fontColor ? fontColor : 'white'
                  }}
                  onClick={() => setStage(questions.length > 0 ? StageType.QUESTION : StageType.NORMAL)}
                >
                  choose nft
                </button>
              </div>
            </div>
            <div
              className="flex items-start justify-end mb-2 px-2"
              style={{ color: fontColor ? fontColor : '#222221', minHeight: '12px' }}
            >
              {active && <Icon icon="bx:reset" fontSize={16} className="cursor-pointer" onClick={handleReset} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniBox;

import React, { useState, useEffect } from 'react';
import { NormalBox, MiniBox } from '../DetailBox';
import { getMintInfo, answerMintQuestions, getAllAssets } from '../../api/mint';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { testConnectors } from '../../utils/connector';
import NFT_ABI from '../../assets/abi/erc1155.json';
import { FirstPartyAnswers } from '../../type';
import { getContract } from '../../utils';
import { Contract } from '@ethersproject/contracts';
import { libraries, ComponentProps } from './type';

const CheckoutWidget: React.FC<ComponentProps> = ({ collectionId, libraryType, view }): JSX.Element => {
  const { account, activate, deactivate, active, library, chainId } = useWeb3React();
  const [mintInfo, setMintInfo] = useState<any>();

  const [socialLinks, setSocialLinks] = useState<any>({
    twitter: {},
    discord: {},
    facebook: {},
    instagram: {}
  });

  const [contract, setContract] = useState<Contract>();

  const [mintPrice, setMintPrice] = useState<number>(0);
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [mintRemain, setMintRemain] = useState<number | undefined>();

  const [nftCount, setNftCount] = useState<string>('');
  const [nftCountError, setNftCountError] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answersError, setAnswersError] = useState<boolean[]>([false, false, false]);
  const [mintProcessing, setMintProcessing] = useState<boolean>(false);
  const [mintSucceed, setMintSucceed] = useState<boolean>(false);

  const [termsProcess, setTermsProcess] = useState<boolean>(false);

  const [assets, setAssets] = useState<any>();
  const [tokenId, setTokenId] = useState<number>();

  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ['Roboto', 'Mouse Memoirs', 'Chilanka', 'Uchen']
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getMintInfo(collectionId)
      .then(async (response: any) => {
        console.log('getMintInfo response:', response);
        if (response.is_multiple_nft) {
          const assetsResponse = await getAllAssets(collectionId);
          setAssets(assetsResponse.data.items.reverse());
        }
        setMintInfo(response);

        let twitterObj = response.social_links.find((item: any) => item.name === 'twitter');
        let discordObj = response.social_links.find((item: any) => item.name === 'discord');
        let facebookObj = response.social_links.find((item: any) => item.name === 'facebook');
        let instagramObj = response.social_links.find((item: any) => item.name === 'instagram');

        setSocialLinks({
          twitter: twitterObj || {},
          discord: discordObj || {},
          facebook: facebookObj || {},
          instagram: instagramObj || {}
        });
      })
      .catch((error) => {
        console.warn('getMintInfo error:', error);
        setMintInfo(null);
      });
  }, [collectionId]);

  useEffect(() => {
    const get = () => {
      if (!mintInfo?.contract_address || !NFT_ABI || !library || !chainId) return undefined;
      let address: string | undefined;
      if (typeof mintInfo?.contract_address === 'string') address = mintInfo?.contract_address;
      else address = mintInfo?.contract_address[chainId];
      if (!address) return undefined;
      try {
        return libraryType === libraries.ETHERS
          ? getContract(address, NFT_ABI, library, account ? account : undefined)
          : new library.eth.Contract(NFT_ABI, address);
      } catch (error) {
        console.error('Failed to get contract', error);
        return undefined;
      }
    };
    const contract = get();
    setContract(contract);
  }, [mintInfo, library, chainId, account]);

  useEffect(() => {
    async function getTokenInfo() {
      if (contract) {
        const id = mintInfo.random_mint ? 1 : tokenId ? tokenId : 1;
        const resMintPrice =
          libraryType === libraries.ETHERS
            ? await contract.tokenPrices(id)
            : await contract.methods.tokenPrices(id).call({ from: account });
        const mintPrice = parseFloat(ethers.utils.formatEther(resMintPrice.toString()));

        const tokenBalance =
          libraryType === libraries.ETHERS
            ? await contract.tokenMintedCount(id)
            : await contract.methods.tokenMintedCount(id).call({ from: account });
        const tokenBalanceReadable = parseInt(tokenBalance.toString());

        const maxSupply =
          libraryType === libraries.ETHERS
            ? await contract.tokenSupplies(id)
            : await contract.methods.tokenSupplies(id).call({ from: account });
        const maxSupplyReadable = parseInt(maxSupply.toString());

        const mintRemaining = maxSupplyReadable ? maxSupplyReadable - tokenBalanceReadable : undefined;
        console.log(mintRemaining);

        const remainingSupply =
          libraryType === libraries.ETHERS
            ? await contract.remainingSupply()
            : await contract.methods.remainingSupply().call({ from: account });

        setMintPrice(mintPrice);
        setMaxSupply(mintInfo.random_mint ? assets.length : maxSupplyReadable);
        setMintRemain(Number(remainingSupply.toString()));
      }
    }
    getTokenInfo();
  }, [contract, tokenId]);

  const onNftCountChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setNftCount(value);
      if (mintInfo.random_mint) setNftCountError(parseInt(value) === 1 ? false : true);
      else setNftCountError(!value);
    }
  };

  const onAnswersChange = (index: number, value: string) => {
    let updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);

    let updatedAnswersError = [...answersError];
    updatedAnswersError[index] = false;
    setAnswersError(updatedAnswersError);
  };

  const handleConnectMetamask = async () => {
    const w: any = window;

    await w.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: mintInfo.chain === 'ethereum' ? '0x5' : '0x13881'
        }
      ]
    });

    activate(testConnectors.injected);
  };

  const handleDisconnectMetamask = () => {
    deactivate();
  };

  const handleCancelTerms = () => {
    setTermsProcess(false);
  };

  const handleMintBtn = async (termsProcess: boolean) => {
    setNftCountError(!nftCount);

    let errors = [...answersError];
    for (let i = 0; i < mintInfo.first_party_data.length; i++) {
      errors[i] = !answers[i];
    }
    setAnswersError(errors);

    if (nftCount) setTermsProcess(termsProcess);
  };

  const handleMint = async () => {
    if (contract) {
      if (!mintInfo.random_mint && !nftCount) {
        setNftCountError(true);
        return;
      }

      setMintProcessing(true);
      const count = mintInfo.random_mint ? 1 : parseInt(nftCount);
      // console.log(account, mintInfo.random_mint ? 1 : tokenId ? tokenId : 1, count);
      try {
        if (libraryType === libraries.ETHERS) {
          const tx = await contract.mint(account, mintInfo.random_mint ? 1 : tokenId ? tokenId : 1, count, {
            value: ethers.utils.parseEther((mintPrice * count).toString())
          });
          await tx.wait();
        } else {
          await contract.methods.mint(account, mintInfo.random_mint ? 1 : tokenId ? tokenId : 1, count).send({
            from: account,
            value: ethers.utils.parseEther((mintPrice * count).toString())
          });
        }
        console.log('mint success!');
        setMintSucceed(true);

        setMintRemain(mintRemain ? mintRemain - count : undefined);

        if (mintInfo.first_party_data.length > 0) {
          postAnswers();
        }
      } catch (error) {
        console.warn(error);
      }
      setMintProcessing(false);
    }
  };

  const postAnswers = () => {
    if (account) {
      let firstPartyAnswers: FirstPartyAnswers[] = mintInfo.first_party_data.map((item: any, index: number) => ({
        question_type: item.type,
        question: item.question,
        answer: answers[index]
      }));

      answerMintQuestions(collectionId, account, firstPartyAnswers)
        .then(async (response: any) => {
          console.log('answerMintQuestions response:', response);
        })
        .catch((error) => {
          console.log('answerMintQuestions error:', error);
        });
    }
  };

  return (
    <div>
      {!!mintInfo && (
        <>
          {view === 'normal' ? (
            <NormalBox
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
              socialLinks={socialLinks}
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
              isMultipleNft={mintInfo.is_multiple_nft}
              isRandomMint={mintInfo.random_mint}
              assets={assets}
              onChangeTokenId={setTokenId}
            />
          ) : (
            <MiniBox
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
              socialLinks={socialLinks}
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
              isMultipleNft={mintInfo.is_multiple_nft}
              isRandomMint={mintInfo.random_mint}
              assets={assets}
              onChangeTokenId={setTokenId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutWidget;

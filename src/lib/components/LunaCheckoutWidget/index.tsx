import React, { useState, useEffect } from 'react';
import IFrameBox from '../IFrameBox';
import { getMintInfo } from '../../api/mint';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { testConnectors } from '../../utils/connector';
import { useContract } from '../../utils/useContract';
import NFT_ABI from '../../assets/abi/erc1155.json';

const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

type ComponentProps = {
    collectionId: string;
    username: string;
    password: string;
};

const LunaCheckoutWidget: React.FC<ComponentProps> = ({ collectionId, username, password }): JSX.Element => {
    const { account, activate, deactivate, active } = useWeb3React();
    const [mintInfo, setMintInfo] = useState<any>();

    const [twitterEnabled, setTwitterEnabled] = useState<boolean>(false);
    const [discordEnabled, setDiscordEnabled] = useState<boolean>(false);
    const [facebookEnabled, setFacebookEnabled] = useState<boolean>(false);
    const [instagramEnabled, setInstagramEnabled] = useState<boolean>(false);

    const [nftCount, setNftCount] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        getMintInfo(collectionId, username, password)
            .then(async (response: any) => {
                console.log('getMintInfo response:', response);
                setMintInfo(response);

                let twitterObj = response.social_links.find((item: any) => item.name === 'twitter');
                setTwitterEnabled(twitterObj ? twitterObj.enabled : false);

                let discordObj = response.social_links.find((item: any) => item.name === 'discord');
                setDiscordEnabled(discordObj ? discordObj.enabled : false);

                let facebookObj = response.social_links.find((item: any) => item.name === 'facebook');
                setFacebookEnabled(facebookObj ? facebookObj.enabled : false);

                let instagramObj = response.social_links.find((item: any) => item.name === 'instagram');
                setInstagramEnabled(instagramObj ? instagramObj.enabled : false);
            })
            .catch((error) => {
                console.log('getMintInfo error:', error);
                setMintInfo(null);

                setTwitterEnabled(false);
                setDiscordEnabled(false);
                setFacebookEnabled(false);
                setInstagramEnabled(false);
            });
    }, [collectionId, username, password]);

    const contract = useContract(mintInfo?.contract_address, NFT_ABI);
    // const contract = useContract('0xf7485edf11bfc4cb0a15a63302cc3a8cf6f98920', NFT_ABI);

    const onNftCountChange = (value: string) => {
        if (!isNaN(Number(value))) {
            setNftCount(value);
        }
    };

    const onAnswersChange = (index: number, value: string) => {
        let updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const handleConnectMetamask = () => {
        activate(testConnectors.injected);
    };

    const handleDisconnectMetamask = () => {
        deactivate();
    };

    const handleMint = async () => {
        console.log(contract);
        if (contract) {
            const res = await contract.mintPrice(1);
            const mintPrice = parseFloat(ethers.utils.formatEther(res.toString()));
            try {
                await contract.mint(account, 1, parseInt(nftCount), {
                    value: ethers.utils.parseEther((mintPrice * parseInt(nftCount)).toString()),
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div>
                {!!mintInfo && (
                    <IFrameBox
                        active={active}
                        nftImgUrl={mintInfo.background_header}
                        collectionImgUrl={mintInfo.image}
                        collectionTitle={mintInfo.name}
                        nftTitle={mintInfo.name}
                        nftDescription={mintInfo.description}
                        price={0.08}
                        mintsRemain={10000}
                        mintBtnDisabled={false}
                        questions={mintInfo.first_party_data.map((item: any) => item.question)}
                        socialLinks={{
                            twitter: twitterEnabled,
                            discord: discordEnabled,
                            facebook: facebookEnabled,
                            instagram: instagramEnabled,
                        }}
                        nftCount={nftCount}
                        onNftCountChange={onNftCountChange}
                        answers={answers}
                        onAnswersChange={onAnswersChange}
                        onConnectWallet={handleConnectMetamask}
                        onDisconnectWallet={handleDisconnectMetamask}
                        onMintNft={handleMint}
                    />
                )}
            </div>
        </Web3ReactProvider>
    );
};

export default LunaCheckoutWidget;

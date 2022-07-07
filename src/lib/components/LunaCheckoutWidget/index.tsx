import React, { useState, useEffect } from 'react';
import IFrameBox from '../IFrameBox';
import { getMintInfo } from '../../api/mint';

type ComponentProps = {
    collectionId: string;
    username: string;
    password: string;
};

const LunaCheckoutWidget: React.FC<ComponentProps> = ({ collectionId, username, password }): JSX.Element => {
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

    return (
        <div>
            {!!mintInfo && (
                <IFrameBox
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
                />
            )}
        </div>
    );
};

export default LunaCheckoutWidget;

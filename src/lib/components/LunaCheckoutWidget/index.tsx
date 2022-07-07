import React, { useState } from 'react';
import IFrameBox from '../IFrameBox';
// import { getMintInfo } from '../../api/mint';

type ComponentProps = {};

const LunaCheckoutWidget: React.FC<ComponentProps> = (): JSX.Element => {
    const [nftCount, setNftCount] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);

    // useEffect(() => {
    //     getMintInfo('aaa', 'aaa')
    //         .then(async (response: any) => {
    //             console.log('getMintInfo response:', response);
    //         })
    //         .catch((error) => {
    //             console.log('getMintInfo error:', error);
    //         });
    // }, []);

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
            <IFrameBox
                nftImgUrl="/assets/background.png"
                collectionImgUrl="/assets/cyberkongz.png"
                collectionTitle="Curry Brand - Into the Metaverse"
                nftTitle="Into The Metaverse"
                nftDescription="This is a short description of the “Into the Metaverse” NFT project. This is a short description of the “Into the Metaverse” NFT project. "
                price={0.08}
                mintsRemain={10000}
                mintBtnDisabled={true}
                questions={['Question 1', 'Question 2', 'Question 3']}
                socialLinks={{ twitter: true, discord: true, facebook: true, instagram: true }}
                nftCount={nftCount}
                onNftCountChange={onNftCountChange}
                answers={answers}
                onAnswersChange={onAnswersChange}
            />
        </div>
    );
};

export default LunaCheckoutWidget;

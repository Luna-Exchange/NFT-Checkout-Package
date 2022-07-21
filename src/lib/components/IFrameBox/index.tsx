import React from 'react';
// import './style.css';
import { Icon } from '@iconify/react';
// import { getMintInfo } from '../../api/mint';
import LunaLogo from '../../assets/LunaLogo';
// import { useWeb3React } from '@web3-react/core';

type ComponentProps = {
    active: boolean;
    nftImgUrl?: string;
    collectionImgUrl?: string;
    collectionTitle: string;
    nftTitle: string;
    nftDescription: string;
    price: number;
    mintsRemain: number | undefined;
    mintBtnDisabled: boolean;
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
};

const IFrameBox: React.FC<ComponentProps> = ({
    active,
    nftImgUrl,
    collectionImgUrl,
    collectionTitle,
    nftTitle,
    nftDescription,
    price,
    mintsRemain,
    mintBtnDisabled,
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
    onAnswersChange
}): JSX.Element => {
    // useEffect(() => {
    //     getMintInfo('aaa', 'aaa')
    //         .then(async (response: any) => {
    //             console.log('getMintInfo response:', response);
    //         })
    //         .catch((error) => {
    //             console.log('getMintInfo error:', error);
    //         });
    // }, []);
    // const { active } = useWeb3React();

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    minHeight: 240,
                    maxHeight: 380,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'left',
                    padding: 8,
                    background: '#1d1d1d'
                }}
                className={className}
            >
                <div style={{ width: '40%', position: 'relative' }}>
                    <img src={nftImgUrl} width="100%" height="100%" alt="" style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <div
                            style={{
                                width: '100%',
                                height: '60%',
                                background:
                                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%)',
                                transform: 'rotate(-180deg)'
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 8
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    src={collectionImgUrl}
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: 100 }}
                                    alt=""
                                />
                                <p style={{ fontSize: 20, color: 'white', marginLeft: 16 }}>{collectionTitle}</p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                {socialLinks['twitter'] && <Icon icon="mdi:twitter" fontSize={24} color="white" />}
                                {socialLinks['discord'] && (
                                    <Icon
                                        icon="ic:baseline-discord"
                                        fontSize={24}
                                        color="white"
                                        style={{ marginLeft: 20 }}
                                    />
                                )}
                                {socialLinks['facebook'] && (
                                    <Icon icon="gg:facebook" fontSize={24} color="white" style={{ marginLeft: 18 }} />
                                )}
                                {socialLinks['instagram'] && (
                                    <Icon icon="mdi:instagram" fontSize={24} color="white" style={{ marginLeft: 18 }} />
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                width: 'fit-content',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                background: '#000000BF',
                                padding: 8,
                                marginLeft: -8
                            }}
                        >
                            <p style={{ fontSize: 14, color: 'white', margin: 0 }}>Powered by</p>
                            {/* <img src={LunaLogo} width={16} height={16} alt="" style={{ marginLeft: 6 }} /> */}
                            <LunaLogo style={{ marginLeft: 6 }} />
                        </div>
                    </div>
                </div>
                <div style={{ width: '30%', display: 'flex', flexDirection: 'column', padding: 16 }}>
                    <p style={{ fontSize: 20, color: 'white' }}>{nftTitle}</p>
                    <p style={{ fontSize: 14, color: '#9E9E9E' }}>{nftDescription}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
                        <div>
                            <p>Price</p>
                            <p style={{ fontWeight: 600 }}>{active ? `${price} ETH` : '-'}</p>
                        </div>
                        <div style={{ marginLeft: 60 }}>
                            <p>Mints Remaining</p>
                            <p style={{ fontWeight: 600 }}>{!active ? '-' : mintsRemain ? mintsRemain : 'Unlimited'}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 16, marginTop: 16 }}>
                        <input
                            placeholder="Number of NFT"
                            value={nftCount}
                            onChange={(event) => onNftCountChange(event.target.value)}
                            style={{
                                width: '50%',
                                padding: '0 8px',
                                borderRadius: 4,
                                border: nftCountError ? '2px solid #EB5757' : 'none'
                            }}
                            className="number-of-nft__inut"
                        />
                        <button
                            disabled={mintBtnDisabled}
                            onClick={onMintNft}
                            style={{
                                width: '50%',
                                height: 34,
                                fontSize: 14,
                                fontWeight: 400,
                                border: ' 1px solid white',
                                borderRadius: 4,
                                background: 'none',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                            className="mint-nft__btn"
                        >
                            MINT NFT
                        </button>
                    </div>
                    {!active ? (
                        <button
                            onClick={onConnectWallet}
                            style={{
                                width: '100%',
                                height: 34,
                                fontSize: 14,
                                fontWeight: 400,
                                border: ' 1px solid white',
                                borderRadius: 4,
                                background: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                marginTop: 16
                            }}
                            className="connect-wallet__btn"
                        >
                            CONNECT WALLET
                        </button>
                    ) : (
                        <button
                            onClick={onDisconnectWallet}
                            style={{
                                width: '100%',
                                height: 34,
                                fontSize: 14,
                                fontWeight: 400,
                                border: ' 1px solid white',
                                borderRadius: 4,
                                background: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                marginTop: 16
                            }}
                            className="connect-wallet__btn"
                        >
                            DISCONNECT WALLET
                        </button>
                    )}
                </div>
                <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 16, marginLeft: 48 }}>
                    {questions[0] && (
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>{questions[0]}</p>
                            <input
                                placeholder="Answer 1"
                                value={answers[0]}
                                onChange={(event) => onAnswersChange(0, event.target.value)}
                                style={{
                                    width: '60%',
                                    padding: '12px 8px',
                                    borderRadius: 4,
                                    border: answersError[0] ? '2px solid #EB5757' : 'none'
                                }}
                            />
                        </div>
                    )}
                    {questions[1] && (
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>{questions[1]}</p>
                            <input
                                placeholder="Answer 2"
                                value={answers[1]}
                                onChange={(event) => onAnswersChange(1, event.target.value)}
                                style={{
                                    width: '60%',
                                    padding: '12px 8px',
                                    borderRadius: 4,
                                    border: answersError[1] ? '2px solid #EB5757' : 'none'
                                }}
                            />
                        </div>
                    )}
                    {questions[2] && (
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>{questions[2]}</p>
                            <input
                                placeholder="Answer 3"
                                value={answers[2]}
                                onChange={(event) => onAnswersChange(2, event.target.value)}
                                style={{
                                    width: '60%',
                                    padding: '12px 8px',
                                    borderRadius: 4,
                                    border: answersError[2] ? '2px solid #EB5757' : 'none'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IFrameBox;

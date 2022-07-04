import React from 'react';
// import './style.css';
import { Icon } from '@iconify/react';

type ComponentProps = {
    nftImgUrl?: string;
    collectionImgUrl?: string;
    lunaLogo?: string;
    collectionTitle: string;
    nftTitle: string;
    nftDescription: string;
    price: number;
    mintsRemain: number;
    mintBtnDisabled: boolean;
    questions: string[];
    socialLinks: { [key: string]: boolean };
    onConnectWallet?: () => void;
    onMintNft?: () => void;
    className?: string;
    nftCount: string;
    onNftCountChange: (value: string) => void;
};

const Widget: React.FC<ComponentProps> = ({
    nftImgUrl,
    collectionImgUrl,
    lunaLogo,
    collectionTitle,
    nftTitle,
    nftDescription,
    price,
    mintsRemain,
    mintBtnDisabled,
    questions,
    socialLinks,
    onConnectWallet,
    onMintNft,
    className = '',
    nftCount,
    onNftCountChange,
}): JSX.Element => {
    return (
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
                background: '#1d1d1d',
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
                            transform: 'rotate(-180deg)',
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
                        padding: 8,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <img src={collectionImgUrl} width={40} height={40} style={{ borderRadius: 100 }} alt="" />
                            <p style={{ fontSize: 20, color: 'white', marginLeft: 16 }}>{collectionTitle}</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
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
                            marginLeft: -8,
                        }}
                    >
                        <p style={{ fontSize: 14, color: 'white', margin: 0 }}>Powered by</p>
                        <img src={lunaLogo} width={16} height={16} alt="" style={{ marginLeft: 6 }} />
                    </div>
                </div>
            </div>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: 16 }}>
                    <p style={{ fontSize: 20, color: 'white' }}>{nftTitle}</p>
                </div>
                <div style={{ height: 1, background: '#444444' }}></div>
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 16,
                    }}
                >
                    <p style={{ fontSize: 14, color: '#9E9E9E' }}>{nftDescription}</p>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
                            <div>
                                <p>Price</p>
                                <p style={{ fontWeight: 600 }}>{`${price} ETH`}</p>
                            </div>
                            <div style={{ marginLeft: 60 }}>
                                <p>Mints Remaining</p>
                                <p style={{ fontWeight: 600 }}>{mintsRemain}</p>
                            </div>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'row', gap: 16, marginTop: 24 }}
                            className="btn-box"
                        >
                            <input
                                placeholder="Number of NFT"
                                value={nftCount}
                                onChange={(event) => onNftCountChange(event.target.value)}
                                style={{ width: '50%', borderRadius: 4 }}
                                className="number-of-nft__inut"
                            ></input>
                            <button
                                disabled={mintBtnDisabled}
                                onClick={onMintNft}
                                style={{
                                    width: '50%',
                                    height: 34,
                                    fontSize: 14,
                                    fontWeight: 400,
                                    // border: ' 1px solid white',
                                    borderRadius: 4,
                                    // background: 'none',
                                    // color: 'white',
                                    // cursor: 'pointer',
                                }}
                                className="mint-nft__btn"
                            >
                                MINT NFT
                            </button>
                        </div>
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
                                marginTop: 16,
                            }}
                            className="connect-wallet__btn"
                        >
                            CONNECT WALLET
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column', marginLeft: 48 }}>
                {questions[0] && (
                    <>
                        <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 1</p>
                        <p
                            style={{
                                width: '60%',
                                padding: '16px',
                                wordBreak: 'break-all',
                                color: 'white',
                                background: '#252525',
                                borderColor: 'transparent',
                                borderRadius: 4,
                                marginTop: 0,
                            }}
                        >
                            {questions[0]}
                        </p>
                    </>
                )}
                {questions[1] && (
                    <>
                        <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 2</p>
                        <p
                            style={{
                                width: '60%',
                                padding: '16px',
                                wordBreak: 'break-all',
                                color: 'white',
                                background: '#252525',
                                borderColor: 'transparent',
                                borderRadius: 4,
                                marginTop: 0,
                            }}
                        >
                            {questions[1]}
                        </p>
                    </>
                )}
                {questions[2] && (
                    <>
                        <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 3</p>
                        <p
                            style={{
                                width: '60%',
                                padding: '16px',
                                wordBreak: 'break-all',
                                color: 'white',
                                background: '#252525',
                                borderColor: 'transparent',
                                borderRadius: 4,
                                marginTop: 0,
                            }}
                        >
                            {questions[2]}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Widget;

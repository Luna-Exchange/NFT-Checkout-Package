import React from 'react';
// import './style.css';

type ComponentProps = {
    bgimg?: string;
    curryLogo?: string;
    lunaLogo?: string;
    collectionTitle: string;
    nftTitle: string;
    nftDescription: string;
    price: number;
    mintsRemain: number;
    mintBtnDisabled: boolean;
    onConnectWallet?: () => void;
    onMintNft?: () => void;
};

const Widget: React.FC<ComponentProps> = ({
    bgimg,
    curryLogo,
    lunaLogo,
    collectionTitle,
    nftTitle,
    nftDescription,
    price,
    mintsRemain,
    mintBtnDisabled,
    onConnectWallet,
    onMintNft,
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
        >
            <div style={{ width: '40%', position: 'relative' }}>
                <img src={bgimg} width="100%" height="100%" alt="" style={{ objectFit: 'cover' }} />
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
                            <img src={curryLogo} width={40} height={40} alt="" />
                            <p style={{ fontSize: 20, color: 'white', marginLeft: 16 }}>{collectionTitle}</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        ></div>
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
                        <div style={{ marginTop: 24 }}>
                            <button
                                disabled={mintBtnDisabled}
                                onClick={onMintNft}
                                style={{
                                    width: 156,
                                    height: 34,
                                    fontSize: 14,
                                    fontWeight: 400,
                                    border: ' 1px solid white',
                                    borderRadius: 4,
                                    background: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                MINT NFT
                            </button>
                            <button
                                onClick={onConnectWallet}
                                style={{
                                    width: 156,
                                    height: 34,
                                    fontSize: 14,
                                    fontWeight: 400,
                                    border: ' 1px solid white',
                                    borderRadius: 4,
                                    background: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    marginLeft: 16,
                                }}
                            >
                                CONNECT WALLET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column', marginLeft: 48 }}>
                <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 1</p>
                <p
                    style={{
                        width: '60%',
                        height: 40,
                        background: '#252525',
                        borderColor: 'transparent',
                        borderRadius: 4,
                        marginTop: 0,
                    }}
                ></p>
                <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 2</p>
                <p
                    style={{
                        width: '60%',
                        height: 40,
                        background: '#252525',
                        borderColor: 'transparent',
                        borderRadius: 4,
                        marginTop: 0,
                    }}
                ></p>
                <p style={{ fontSize: 12, fontWeight: 400, color: '#9E9E9E' }}>Question 3</p>
                <p
                    style={{
                        width: '60%',
                        height: 100,
                        background: '#252525',
                        borderColor: 'transparent',
                        borderRadius: 4,
                        marginTop: 0,
                    }}
                ></p>
            </div>
        </div>
    );
};

export default Widget;

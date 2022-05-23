import React from "react";
// import './style.css';

type ComponentProps = {
  bgimg?: string;
  curryLogo?: string;
  lunaLogo?: string;
  onConnectWallet?: () => void;
};

const Widget: React.FC<ComponentProps> = ({
  bgimg,
  curryLogo,
  lunaLogo,
  onConnectWallet,
}): JSX.Element => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 240,
        maxHeight: 380,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        textAlign: "left",
        padding: 8,
        background: "#1d1d1d",
      }}
    >
      <div style={{ width: "60%", position: "relative" }}>
        <img
          src={bgimg}
          width="100%"
          height="100%"
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              width: "100%",
              height: "60%",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%)",
              transform: "rotate(-180deg)",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={curryLogo} width={40} height={40} alt="" />
            <p style={{ fontSize: 20, color: "white", marginLeft: 16 }}>
              Curry Brand - Into the Metaverse
            </p>
          </div>
          <div
            style={{
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "#000000BF",
              padding: 8,
              marginLeft: -8,
            }}
          >
            <p style={{ fontSize: 14, color: "white", margin: 0 }}>
              Powered by
            </p>
            <img
              src={lunaLogo}
              width={16}
              height={16}
              alt=""
              style={{ marginLeft: 6 }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 20, color: "white" }}>Into the Metaverse</p>
        </div>
        <div style={{ height: 1, background: "#444444" }}></div>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <p style={{ fontSize: 14, color: "#9E9E9E" }}>
            This is a short description of the “Into the Metaverse” NFT project.
          </p>
          <div>
            <div
              style={{ display: "flex", flexDirection: "row", color: "white" }}
            >
              <div>
                <p>Price</p>
                <p style={{ fontWeight: 600 }}>0.08 ETH</p>
              </div>
              <div style={{ marginLeft: 60 }}>
                <p>Mints Remaining</p>
                <p style={{ fontWeight: 600 }}>20,000</p>
              </div>
            </div>
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: "6px 16px",
                marginTop: 24,
                cursor: "pointer",
              }}
              onClick={onConnectWallet}
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;

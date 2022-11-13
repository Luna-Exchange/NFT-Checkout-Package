interface CoverProps {
  isMultipleNft: boolean;
  assets: any | any[];
}

const CoverComponent: React.FC<CoverProps> = ({ isMultipleNft, assets }) => {
  return (
    <>
      {isMultipleNft === false ? (
        <img src={assets} alt="" className="object-cover w-screen h-full sm:w-full sm:h-full rounded-2xl" />
      ) : Array.isArray(assets) ? (
        assets.length >= 9 ? (
          <div
            className="grid overflow-hidden grid-cols-3 grid-rows-3 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            {assets.map((asset: any, index: any) => (
              <img key={index} src={asset.image} />
            ))}
          </div>
        ) : assets.length === 8 ? (
          <div
            className="grid overflow-hidden grid-rows-3 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            <div className="grid grid-cols-3">
              {assets.slice(0, 3).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-cols-2">
              {assets.slice(3, 5).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-cols-3">
              {assets.slice(5, 8).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
          </div>
        ) : assets.length === 7 ? (
          <div
            className="grid overflow-hidden grid-rows-3 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            <div className="grid grid-cols-2">
              {assets.slice(0, 2).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-cols-3">
              {assets.slice(2, 5).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-cols-2">
              {assets.slice(5, 7).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
          </div>
        ) : assets.length === 6 ? (
          <div
            className="grid overflow-hidden grid-cols-2 grid-rows-3 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            {assets.map((asset: any, index: any) => (
              <img key={index} src={asset.image} />
            ))}
          </div>
        ) : assets.length === 5 ? (
          <div
            className="grid overflow-hidden grid-cols-2 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            <div className="grid grid-rows-3">
              {assets.slice(0, 3).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-rows-2">
              {assets.slice(3, 5).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
          </div>
        ) : assets.length === 4 ? (
          <div
            className="grid overflow-hidden grid-cols-2 grid-rows-2 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            {assets.map((asset: any, index: any) => (
              <img className="object-cover w-full h-full" key={index} src={asset.image} />
            ))}
          </div>
        ) : assets.length === 3 ? (
          <div
            className="grid overflow-hidden grid-rows-2 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            <div className="grid grid-cols-2">
              {assets.slice(0, 2).map((asset: any, index: any) => (
                <img className="object-cover" key={index} src={asset.image} />
              ))}
            </div>
            <div className="grid grid-cols-1">
              {assets.slice(2, 3).map((asset: any, index: any) => (
                <img key={index} src={asset.image} />
              ))}
            </div>
          </div>
        ) : assets.length === 2 ? (
          <div
            className="grid overflow-hidden grid-cols-2 w-screen h-full sm:w-full sm:h-full rounded-2xl"
            style={{ maxWidth: '421px', maxHeight: '421px' }}
          >
            {assets.map((asset: any, index: any) => (
              <img key={index} src={asset.image} />
            ))}
          </div>
        ) : assets.length === 1 ? (
          <img src={assets[0]} alt="" className="object-cover w-screen h-full sm:w-full sm:h-full rounded-2xl" />
        ) : null
      ) : null}
    </>
  );
};
export default CoverComponent;

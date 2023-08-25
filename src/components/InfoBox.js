import React from 'react';

function InfoBox({ data }) {
  return (
    <div className="info-box">
      <div>Basic Info: {data.basicInfo}</div>
      <div>Pair Created At: {data.pairCreatedAt}</div>
      <div>Symbol: {data.symbol}</div>
      <div>DexID: {data.dexID}</div>
      <div>Pair Address: {data.pairAddress}</div>
      <button className="info-btn">i</button>
    </div>
  );
}

export default InfoBox;

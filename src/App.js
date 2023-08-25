
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';

function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const [searchType, setSearchType] = useState('token'); // Default to token search

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      let apiUrl = '';

      if (searchType === 'token') {
        apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${searchTerm}`;
      } else if (searchType === 'pair') {
        apiUrl = `https://api.dexscreener.com/latest/dex/search/?q=:${searchTerm}`;
      }

      const response = await axios.get(apiUrl);
      const data = response.data.pairs;
      console.log(data);

      // Assuming each returned data has a price property
      const sortedData = data.sort((a, b) => b.price - a.price).slice(0, 10);
      setResults(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchTerm('');
    setResults([]);
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return address.length > 5 ? `${address.slice(0, 5)}...` : address;
  };

  // ... previous code ...

return (
  <div className="App">
    <div className="left-panel">
    {/* <img src='vector.jpg'></img> */}
    <div className='logo'>NFTily</div>
      {/* <button className='option-btn'>Token Address</button>
      <button className='option-btn'>Pair Address</button> */}
      <button className={`option-btn ${searchType === 'token' ? 'active' : ''}`} onClick={() => handleSearchTypeChange('token')}>Token Address</button>
      <button className={`option-btn ${searchType === 'pair' ? 'active' : ''}`} onClick={() => handleSearchTypeChange('pair')}>Pair Address</button>
    </div>
    <div className="main-content">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button className="connect-btn" onClick={handleSearch}>Connect</button>
      </div>
      <div className="search-results-title">{searchType === 'token' ? 'Token Search Results' : 'Pair Search Results'}</div>
      <div className="info-box-grid">
        {results.map((result, index) => (
            <div className="info-row" key={index}>
              <div className="info-box">
                <h3>Basic Info</h3>
                <br/>
                <p>Pair created at: {new Date(result.pairCreatedAt).toLocaleDateString()}</p>
                <p>Symbol: {result.baseToken.symbol}</p>
                <p>DexID: {result.dexId}</p>
                <p>Pair Address: {truncateAddress(result.pairAddress)}</p>
                <button className="info-btn">i</button>
              </div>
              <div className="info-box">
                <h3>Basic Token</h3>
                <br/>
                <p>Name: {result.baseToken.name}</p>
                <p>Symbol: {result.baseToken.symbol}</p>
                <p>Address: {truncateAddress(result.baseToken.address)}</p>
                <button className="info-btn">i</button>
              </div>
              <div className="info-box">
                <h3>Quote Token</h3>
                <br/>
                <p>Name: {result.quoteToken.name}</p>
                <p>Symbol: {result.quoteToken.symbol}</p>
                <p>Address: {truncateAddress(result.quoteToken.address)}</p>
                <button className="info-btn">i</button>
              </div>
              <div className="info-box">
                <h3>Price</h3>
                <br/>
                <p>Price native: {result.priceNative}</p>
                <p>Price USD: {result.priceUsd}</p>
                <button className="info-btn">i</button>
              </div>
            </div>
        ))}
      </div>
    </div>
    <br/>
  </div>
);

// ... previous code ...

}

export default App;

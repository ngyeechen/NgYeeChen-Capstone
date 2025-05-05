// When in doubt, just include import React from 'react'
//import React from 'react';
import React, { useState } from 'react';


//const validateStockSymbol = (symbol) => {}
// alphaVantage API key: YLQSM14YBNTNAFRE
const validateStockSymbol = async (symbol) => {
    const API_KEY = 'YLQSM14YBNTNAFRE'; // Replace with your actual Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.bestMatches && data.bestMatches.length > 0) {
        // Check if the symbol is in the bestMatches array
        const matchedSymbol = data.bestMatches.find(match => match['1. symbol'] === symbol.toUpperCase());
        return matchedSymbol ? true : false;
      }
      return false;
    } catch (error) {
      console.error('Error validating stock symbol:', error);
      return false;
    }
  };
  

const Stockform = () => {
//jumping button test
    const [buttonPosition, setButtonPosition] = useState({ top: -1, left: 20 });
  
    const handleMouseEnter = () => {
      const randomTop = Math.floor(Math.random() * 300); // random top position
      const randomLeft = Math.floor(Math.random() * 300); // random left position
      setButtonPosition({ top: randomTop, left: randomLeft });
    };

  return (
    <div className="container">
      <h1 className="header">Finance Dashboard</h1>
      <div className="form">
        <input 
          type="text" 
          placeholder="Stock Symbol (e.g., AAPL)" 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Purchase Price" 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button 
            className="submit-button" 
            onMouseEnter={handleMouseEnter}
            style={{
                position: 'relative',
                top: buttonPosition.top,
                left: buttonPosition.left,
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
        >
            Submit
        </button>
      </div>
      
      <h2>Stock List</h2>
      <p>No stocks added yet.</p>
    </div>
  );
};

export default Stockform;

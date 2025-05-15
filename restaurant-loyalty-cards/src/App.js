import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import MobileLoyaltyCard from './components/MobileLoyaltyCard/MobileLoyaltyCard';
import './App.css';

function App() {
  console.log("i'm running")
  const [cardData, setCardData] = useState(null);

  const handleFormSubmit = (data) => {
    setCardData(data);
  };

  const getEncodedData = () => {
    return btoa(JSON.stringify(cardData));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Restaurant Loyalty Card Creator</h1>
              <RestaurantForm onSubmit={handleFormSubmit} />
              {cardData && (
                <div className="qr-code-container">
                  <h2>Scan this QR Code with a mobile device</h2>
                  <QRCodeSVG value={`${window.location.origin}/card/${getEncodedData()}`} size={256} />
                </div>
              )}
            </>
          } />
          <Route path="/card/:encodedData" element={<MobileLoyaltyCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
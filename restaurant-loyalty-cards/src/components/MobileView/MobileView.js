import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import './MobileView.css';

function MobileView() {
    const [scannedCard, setScannedCard] = useState(null);
    const [stamps, setStamps] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedStamps = localStorage.getItem('stamps');
        if (savedStamps) {
            setStamps(parseInt(savedStamps));
        }
    }, []);

    const handleScan = (data) => {
        if (data) {
            try {
                const cardData = JSON.parse(data);
                setScannedCard(cardData);
                setError(null);
            } catch (err) {
                setError('Invalid QR code');
            }
        }
    };

    const handleError = (err) => {
        setError(err.message);
    };

    const addStamp = () => {
        const newStamps = stamps + 1;
        setStamps(newStamps);
        localStorage.setItem('stamps', newStamps);
    };

    const resetStamps = () => {
        setStamps(0);
        localStorage.removeItem('stamps');
    };

    return (
        <div className="mobile-view">
            {!scannedCard ? (
                <>
                    <h2>Scan Loyalty Card QR Code</h2>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                    <div className="loyalty-card">
                        <h2>{scannedCard.restaurantName}</h2>
                        <p>Loyalty Program: {scannedCard.loyaltyProgram}</p>
                        <p>Reward: {scannedCard.rewardDescription}</p>
                        <div className="stamp-area">
                            {[...Array(scannedCard.stampCount)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`stamp ${index < stamps ? 'filled' : ''}`}
                                    onClick={index === stamps ? addStamp : undefined}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <button onClick={resetStamps}>Reset Stamps</button>
                    </div>
                )}
        </div>
    );
}

export default MobileView;
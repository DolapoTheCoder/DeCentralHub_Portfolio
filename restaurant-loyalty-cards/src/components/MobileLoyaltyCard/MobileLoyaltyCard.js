import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MobileLoyaltyCard.css';

function MobileLoyaltyCard() {
    const { encodedData } = useParams();
    const [cardData, setCardData] = useState(null);
    const [stamps, setStamps] = useState(0);

    useEffect(() => {
        if (encodedData) {
            const decodedData = JSON.parse(atob(encodedData));
            setCardData(decodedData);
            const savedStamps = localStorage.getItem(`stamps_${decodedData.restaurantName}`);
            if (savedStamps) {
                setStamps(parseInt(savedStamps));
            }
        }
    }, [encodedData]);

    const addStamp = () => {
        if (stamps < cardData.stampCount) {
            const newStamps = stamps + 1;
            setStamps(newStamps);
            localStorage.setItem(`stamps_${cardData.restaurantName}`, newStamps);
        }
    };

    if (!cardData) {
        return <div>Loading...</div>;
    }

    const progress = (stamps / cardData.stampCount) * 100;

    return (
        <div className="mobile-loyalty-card">
            <h2>{cardData.restaurantName}</h2>
            <p>{cardData.loyaltyProgram}</p>
            <div className="stamp-area">
                {[...Array(cardData.stampCount)].map((_, index) => (
                    <div
                        key={index}
                        className={`stamp ${index < stamps ? 'filled' : ''}`}
                        onClick={addStamp}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <p>Progress: {stamps} / {cardData.stampCount}</p>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p>Reward: {cardData.rewardDescription}</p>
        </div>
    );
}

export default MobileLoyaltyCard;
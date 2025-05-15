import React from 'react';
import './LoyaltyCard.css';

function LoyaltyCard({ restaurantName, loyaltyProgram, rewardDescription, cardColor, stampColor, stampCount }) {
    return (
        <div className="loyalty-card" style={{ backgroundColor: cardColor }}>
            <h2>{restaurantName}</h2>
            <p className="program">{loyaltyProgram}</p>
            <div className="stamp-area">
                {[...Array(stampCount)].map((_, index) => (
                    <div key={index} className="stamp" style={{ backgroundColor: stampColor }}>
                        {index + 1}
                    </div>
                ))}
            </div>
            <p className="reward">Reward: {rewardDescription}</p>
        </div>
    );
}

export default LoyaltyCard;
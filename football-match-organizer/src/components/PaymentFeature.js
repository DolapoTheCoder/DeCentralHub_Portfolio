import React, { useState } from 'react';

function PaymentFeature({ gameId, fee }) {
    const [paymentStatus, setPaymentStatus] = useState('Not Paid');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handlePayment = () => {
        console.log(`Processing payment of $${fee} for game ${gameId}`);
        console.log('Card details:', cardDetails);
        // Here you would typically send this payment info to your backend
        // and process the payment using a payment gateway
        setPaymentStatus('Paid');
        setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
    };

    return (
        <div>
            <h3>Payment for Game {gameId}</h3>
            <p>Fee: ${fee}</p>
            <p>Status: {paymentStatus}</p>
            {paymentStatus === 'Not Paid' && (
                <div>
                    <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                        required
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                    />
                    <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        required
                    />
                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            )}
        </div>
    );
}

export default PaymentFeature;
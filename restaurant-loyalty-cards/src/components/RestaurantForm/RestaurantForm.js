import React, { useState, useEffect } from 'react';
import LoyaltyCard from '../LoyaltyCard/LoyaltyCard';
import './RestaurantForm.css';

function RestaurantForm({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        restaurantName: '',
        loyaltyProgram: '',
        rewardDescription: '',
        cardColor: '#f0f0f0',
        stampColor: '#ffffff',
        stampCount: 10
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'stampCount' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-preview-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant Name"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="loyaltyProgram"
                    placeholder="Loyalty Program (e.g., Buy 10 Get 1 Free)"
                    value={formData.loyaltyProgram}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="rewardDescription"
                    placeholder="Reward Description"
                    value={formData.rewardDescription}
                    onChange={handleChange}
                    required
                />
                <div className="color-inputs">
                    <label>
                        Card Color:
            <input
                            type="color"
                            name="cardColor"
                            value={formData.cardColor}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Stamp Color:
            <input
                            type="color"
                            name="stampColor"
                            value={formData.stampColor}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <label>
                    Number of Stamps:
          <input
                        type="number"
                        name="stampCount"
                        min="1"
                        max="20"
                        value={formData.stampCount}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Create Loyalty Card</button>
            </form>
            <div className="card-preview">
                <h3>Card Preview</h3>
                <LoyaltyCard {...formData} />
            </div>
        </div>
    );
}

export default RestaurantForm;
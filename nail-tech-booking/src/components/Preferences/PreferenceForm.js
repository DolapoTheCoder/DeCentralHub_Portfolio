import React, { useState } from 'react';

function PreferenceForm({ onPreferenceSubmit }) {
    const [preferences, setPreferences] = useState({
        favoriteService: '',
        preferredStyle: '',
        preferredTechnician: '',
        additionalNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPreferenceSubmit(preferences);
        setPreferences({
            favoriteService: '',
            preferredStyle: '',
            preferredTechnician: '',
            additionalNotes: '',
        });
    };

    return (
        <div className="preference-form">
            <h2>Set Your Preferences</h2>
            <form onSubmit={handleSubmit}>
                <select
                    name="favoriteService"
                    value={preferences.favoriteService}
                    onChange={handleChange}
                    required
                >
                    <option value="">Favorite Service</option>
                    <option value="manicure">Manicure</option>
                    <option value="pedicure">Pedicure</option>
                    <option value="nail-art">Nail Art</option>
                </select>
                <input
                    type="text"
                    name="preferredStyle"
                    value={preferences.preferredStyle}
                    onChange={handleChange}
                    placeholder="Preferred Nail Style"
                />
                <input
                    type="text"
                    name="preferredTechnician"
                    value={preferences.preferredTechnician}
                    onChange={handleChange}
                    placeholder="Preferred Nail Technician"
                />
                <textarea
                    name="additionalNotes"
                    value={preferences.additionalNotes}
                    onChange={handleChange}
                    placeholder="Additional Notes or Preferences"
                ></textarea>
                <button type="submit">Save Preferences</button>
            </form>
        </div>
    );
}

export default PreferenceForm;

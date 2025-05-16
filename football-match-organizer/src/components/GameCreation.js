import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

function GameCreation() {
    const { addGame } = useAppContext();
    const [gameDetails, setGameDetails] = useState({
        date: '',
        time: '',
        location: '',
        maxPlayers: '',
        fee: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGameDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGame(gameDetails);
        setGameDetails({ date: '', time: '', location: '', maxPlayers: '', fee: '' });
    };

    return (
        <div>
            <h2>Create New Game</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={gameDetails.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={gameDetails.time}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={gameDetails.location}
                    placeholder="Location"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="maxPlayers"
                    value={gameDetails.maxPlayers}
                    placeholder="Max Players"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="fee"
                    value={gameDetails.fee}
                    placeholder="Match Fee"
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Create Game</button>
            </form>
        </div>
    );
}

export default GameCreation;
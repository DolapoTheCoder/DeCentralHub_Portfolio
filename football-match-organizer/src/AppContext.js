import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [games, setGames] = useState([
        { id: 1, date: '2023-07-01', time: '18:00', location: 'Central Park', maxPlayers: 10, fee: 5 },
        { id: 2, date: '2023-07-08', time: '19:00', location: 'Riverside Field', maxPlayers: 12, fee: 7 },
    ]);

    const addGame = (game) => {
        setGames([...games, { ...game, id: games.length + 1 }]);
    };

    return (
        <AppContext.Provider value={{ games, addGame }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
import React, { useState, useEffect } from 'react';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // In a real application, you would fetch this data from your backend
        const mockLeaderboardData = [
            { id: 1, name: 'John Doe', gamesPlayed: 10, goalsScored: 15, assists: 7 },
            { id: 2, name: 'Jane Smith', gamesPlayed: 8, goalsScored: 12, assists: 10 },
            { id: 3, name: 'Mike Johnson', gamesPlayed: 9, goalsScored: 8, assists: 15 },
            { id: 4, name: 'Sarah Williams', gamesPlayed: 7, goalsScored: 10, assists: 5 },
        ];

        setLeaderboard(mockLeaderboardData);
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Games Played</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Goals</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assists</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard
                        .sort((a, b) => (b.goalsScored + b.assists) - (a.goalsScored + a.assists))
                        .map((player, index) => (
                            <tr key={player.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.gamesPlayed}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.goalsScored}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.assists}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.goalsScored + player.assists}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
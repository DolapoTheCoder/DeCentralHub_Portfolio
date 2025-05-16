import React, { useState } from 'react';
import RSVPAndAttendance from './RSVPAndAttendance';
import PaymentFeature from './PaymentFeature';
import { useAppContext } from '../AppContext';

function GameList() {
    const { games } = useAppContext();
    const [inviteEmail, setInviteEmail] = useState('');

    const handleInvite = (gameId) => {
        console.log(`Inviting ${inviteEmail} to game ${gameId}`);
        setInviteEmail('');
    };

    return (
        <div>
            <h2>Upcoming Games</h2>
            {games.map(game => (
                <div key={game.id} className="game-item">
                    <h3>{game.date} at {game.time}</h3>
                    <p>Location: {game.location}</p>
                    <p>Max Players: {game.maxPlayers}</p>
                    <input
                        type="email"
                        placeholder="Enter email to invite"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <button onClick={() => handleInvite(game.id)}>Send Invite</button>
                    <RSVPAndAttendance gameId={game.id} />
                    <PaymentFeature gameId={game.id} fee={game.fee} />
                </div>
            ))}
        </div>
    );
}

export default GameList;
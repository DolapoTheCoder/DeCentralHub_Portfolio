import io from 'socket.io-client';

// In a real-world scenario, this would be the URL of your WebSocket server
const SOCKET_URL = 'http://localhost:3001';

const socket = io(SOCKET_URL);

export default socket;
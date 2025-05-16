import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import { AppProvider } from './AppContext';
import { Header, HeaderTitle } from './StyledComponents';
import socket from './socket';

function App() {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    socket.on('notification', (message) => {
      setNotification(message);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <Header>
          <HeaderTitle>Chicken Kitchen AI-Driven Order Management System</HeaderTitle>
        </Header>
        <main>
          <Dashboard />
        </main>
        <Notification message={notification} />
      </div>
    </AppProvider>
  );
}

export default App;

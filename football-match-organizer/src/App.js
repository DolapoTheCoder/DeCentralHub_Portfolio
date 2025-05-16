import React from 'react';
import './App.css';
import './styles.css';
import GameCreation from './components/GameCreation';
import GameList from './components/GameList';
import Leaderboard from './components/Leaderboard';
import { AppProvider } from './AppContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="App">
          <header className="App-header">
            <h1>Football Match Organizer</h1>
          </header>
          <main>
            <GameCreation />
            <GameList />
            <div className="leaderboard">
              <Leaderboard />
            </div>
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;